import type { ChatEvent } from "../models/ChatEvent";
import type { JimmiApi } from "../models/JimmiApi";
import type { SearchEntry } from "../models/invidious/SearchEntry";
import type { VideoResponse } from "../models/invidious/VideoResponse";
import type { IJimmiEventMap } from "../models/JimmiPlugin";
import { JimmiPlugin } from "../models/JimmiPlugin";
import { Track } from "../models/Track";

export default class MusicPlugin extends JimmiPlugin {
  readonly meta = {
    id: "xyz.jimmi.music",
    name: "Music",
    version: "0.2.0",
  };

  readonly commands = {
    "play": this.play,
    "queue": this.queue,
    "cue": this.queue, // alias :)
    "track": this.track,
  };

  readonly events?: IJimmiEventMap | undefined;

  readonly translations = {
    en: {
      description: "A music plugin that allows for audio playback of youtube videos",
      commands: {
        play: {
          usage: "!play <url|searchTerm> - Play a youtube video by url or search term",
          playingTrack: "Playing {title}"
        },
        queue: {
          usage: `!queue - Show the current queue.
!queue <url|searchTerm> - Add a YouTube video to the queue.`,
          isEmpty: "The queue is currently empty",
          content: "Queue content",
          addedTrack: "Added {title} to queue"
        },
        cue: {
          usage: "!cue - Alias for !queue",
        },
        track: {
          usage: `!track - Display current track
!track skip - Skip the current track
!track ++ or !track -- - Fast forward or rewind. Add more + or - signs to increase duration
!track +10, !track +20, !track -15 - Fast forward or rewind with specific duration in seconds`,
          currentlyPlaying: "Currently playing {title}"
        }
      },
      general: {
        invalidArgs: "Invalid arguments. Usage:",
        noVideo: "Sorry, I cannot find any video at the moment",
      }
    },
  };

  private baseUrl = "https://invidious.snopyta.org";

  /**
   * Internal fetch method that contructs the API url and formats the response as json
   *
   * @param endpoint - The endpoint to fetch
   * @returns Promise of the given type wich describes the json response
   */
  private async fetch<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}/api/v1/${endpoint}`, {
      referrerPolicy: 'no-referrer',
    });
    return await res.json();
  }

  /**
   * Retrieve youtube video ID from search term
   *
   * @param search - The term to search for
   * @returns The ID of the first search result or null if nothing was found.
   */
  private async searchYtVideo(search: string): Promise<string | null> {
    const res = await this.fetch<SearchEntry[]>(`search/?q=${encodeURIComponent(search)}`);
    if (res.length > 0) {
      return res[0].videoId;
    }
    return null;
  }

  /**
   * Retrieve details of a given youtube video
   *
   * @param videoId - The video ID
   * @returns The resulting track
   */
  private async getTrack(videoId: string): Promise<Track | null> {
    const res = await this.fetch<VideoResponse>(`videos/${videoId}`);
    if (res.error) {
      return null;
    }
    return new Track(res);
  }

  private async query(params: string[]): Promise<Track | null> {
    const query = params.join(' ');
    const videoId = await this.searchYtVideo(query);
    if (!videoId) {
      return null;
    }
    return this.getTrack(videoId);
  }

  async play(event: ChatEvent): Promise<void> {
    if (event.params.length === 0) {
      event.respond(`:warning: ${this.$t('general.invalidArgs')}\n${this.$t('commands.play.usage')}`);
    } else {
      const track = await this.query(event.params);
      if (!track) {
        event.respond(`${this.$t('general.noVideo')} :worried:`)
        return;
      }
      this.api.currentTrack = track;
      this.api.conference.sendMessage(
        `:notes: ${this.$t('commands.play.playingTrack', { values: { title: track.title } })}`
      );
    }
  }

  async queue(event: ChatEvent): Promise<void> {
    if (event.params.length === 0) {
      if (this.api.queue.length === 0) {
        event.respond(`:notes: ${this.$t('commands.queue.isEmpty')}`);
      } else {
        let idx = 0;
        const numRegex = new RegExp(/(\d)/ig)
        // print human readable queue into chat
        event.respond(this.api.queue.reduce((msg, track) =>
          `${msg}\n${(++idx).toString().replaceAll(numRegex, ":$1:")} ${track.title}`,
          `:notes: ${this.$t('commands.queue.content')}`
        ));
      }
    } else {
      const track = await this.query(event.params);
      if (!track) {
        event.respond(`${this.$t('general.noVideo')} :worried:`)
        return;
      }
      if (this.api.currentTrack) {
        this.api.queue.push(track);
      } else {
        this.api.currentTrack = track;
      }
      event.respond(
        `:notes: ${this.$t('commands.queue.addedTrack', { values: { title: track.title } })}`
      );
    }
  }

  async track(event: ChatEvent) {
    switch (event.params.length) {
      case 0:
        event.respond(
          `:notes: ${this.$t('commands.track.currentlyPlaying', { values: { title: this.api.currentTrack?.title ?? 'nothing' } })}`
        );
        break;
      case 1:
        const param = event.params[0];
        if (param === "skip") {
          this.api.currentTrack = undefined;
          return;
        }

        let seconds = 0;
        const f = (x: number) => 2 * Math.E ^ (x - 1); // non-linear function to fast forward
        if (/^\+\++$/.test(param)) {
          seconds = f(param.length)
        } else if (/^--+$/.test(param)) {
          seconds = -f(param.length)
        } else {
          seconds = parseInt(param, 10);
        }

        if (!seconds) {
          event.respond(`:warning: ${this.$t('general.invalidArgs')}\n${this.$t('commands.track.usage')}`);
        } else {
          this.api.forward(seconds);
        }
        break;
      default:
        event.respond(`:warning: ${this.$t('general.invalidArgs')}\n${this.$t('commands.track.usage')}`);
    }
  }
}
