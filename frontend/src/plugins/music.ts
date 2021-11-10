import type { JimmiPlugin } from "../models/JimmiPlugin"
import type { SearchEntry } from "../models/invidious/SearchEntry";
import type { VideoResponse } from "../models/invidious/VideoResponse";
import type { Video } from "../models/Video";
import { queue as writableQueue } from "../stores";

// ToDo: GUI-settings
const baseUrl = "https://invidious.snopyta.org";
let mediaQueue: Video[] = [];
writableQueue.subscribe((queue) => { mediaQueue = queue });


/**
 * Internal fetch method that contructs the API url and formats the response as json
 *
 * @param endpoint - The endpoint to fetch
 * @returns Promise of the given type wich describes the json response
 */
async function _fetch<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${baseUrl}/api/v1/${endpoint}`, {
    referrerPolicy: 'no-referrer',
  });
  return await res.json();
}

/**
 * Retrieve youtube video ID from search term
 *
 * @param search - Search term to be matched
 * @returns The ID of the first search result, empty string if nothing was found.
 */
async function searchYtVideo(search: string): Promise<string | undefined> {
  const res = await _fetch<SearchEntry[]>(`search/?q=${encodeURIComponent(search)}`);
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
async function getVideoInfo(videoId: string): Promise<Video | undefined> {
  const res = await _fetch<VideoResponse>(`videos/${videoId}`);
  if (res.error) {
    return;
  }

  const adaptiveFormat = res.adaptiveFormats.filter((format) => format.encoding === "opus")[0];
  return <Video>{
    title: res.title,
    thumbnail: res.videoThumbnails[0].url,
    source: adaptiveFormat.url,
  }
}

async function _query(params: string[]): Promise<Video | undefined> {
  const query = params.join(' ');
  const videoId = await searchYtVideo(query);
  if (!videoId) {
    // ToDo: add error handling
  }
  return getVideoInfo(videoId);
}

async function play(params: string[]): Promise<void> {
  if (params.length === 0) {
    // ToDo: add error handling
  } else {
    const video = await _query(params);
    if (!video) {
      // ToDo: handleError
    }
    writableQueue.set([video]);
  }
}

async function queue(params: string[]): Promise<void> {
  if (params.length === 0) {
    // ToDo: show queue
  } else {
    const video = await _query(params);
    if (!video) {
      // ToDo: handleError
    }
    if (mediaQueue.length > 0) {
      mediaQueue.push(video);
    } else {
      writableQueue.set([video]); // redifine array to trigger instant play function
    }
  }
}

const MusicPlugin: JimmiPlugin = {
  meta: {
    name: "Music",
    description: "A music plugin that allows for playback from youtube",
    version: "0.1.0",
  },
  commands: {
    "play": play,
    "queue": queue,
    "cue": queue, // alias :)
  }
}

export default MusicPlugin;
