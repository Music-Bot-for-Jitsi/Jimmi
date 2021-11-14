import type { VideoResponse } from "./invidious/VideoResponse"

export class Track {
  #thumbnailUrl: string;
  #title: string;
  #source: string;

  constructor(res: VideoResponse) {
    this.#thumbnailUrl = res.videoThumbnails[0].url;
    this.#title = res.title;
    this.#source = res.adaptiveFormats.filter((format) => format.encoding === "opus")[0].url;
  }

  get thumbnailUrl() {
    return this.#thumbnailUrl;
  }

  get title() {
    return this.#title;
  }

  get source() {
    return this.#source;
  }
}
