import type { SearchEntry } from "../models/invidious/SearchEntry";
import type { VideoResponse } from "../models/invidious/VideoResponse";
import type { Video } from "../models/Video";
import { JimmiPlugin } from "../models/JimmiPlugin";
import type { JimmiApi } from "../models/JimmiApi";

export default class MusicPlugin extends JimmiPlugin {
  readonly meta = {
    name: "Music",
    description: "A music plugin that allows for audio playback of youtube videos",
    version: "0.1.0",
  };

  readonly commands = {
    "play": this.play.bind(this),
    "queue": this.queue.bind(this),
    "cue": this.queue.bind(this), // alias :)
  };

  private baseUrl = "https://invidious.snopyta.org";

  constructor(api: JimmiApi) {
    super(api);
    this.fetch.bind(this);
    this.searchYtVideo.bind(this);
    this.getVideoInfo.bind(this);
    this.query.bind(this);
    this.play.bind(this);
  }

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
   * @returns The video summary
   */
  private async getVideoInfo(videoId: string): Promise<Video | null> {
    const res = await this.fetch<VideoResponse>(`videos/${videoId}`);
    if (res.error) {
      return null;
    }
    const adaptiveFormat = res.adaptiveFormats.filter((format) => format.encoding === "opus")[0];
    return <Video>{
      title: res.title,
      thumbnail: res.videoThumbnails[0].url,
      source: adaptiveFormat.url,
    }
  }

  private async query(params: string[]): Promise<Video | null> {
    const query = params.join(' ');
    const videoId = await this.searchYtVideo(query);
    if (!videoId) {
      // ToDo: add error handling
      return null;
    }
    return this.getVideoInfo(videoId);
  }

  async play(params: string[]): Promise<void> {
    if (params.length === 0) {
      // ToDo: add error handling
    } else {
      const video = await this.query(params);
      if (!video) {
        // ToDo: handleError
        return;
      }
      this.api.play(video);
    }
  }

  async queue(params: string[]): Promise<void> {
    if (params.length === 0) {
      // ToDo: show queue
    } else {
      const video = await this.query(params);
      if (!video) {
        // ToDo: handleError
        return;
      }
      this.api.queue.push(video);
    }
  }
}
