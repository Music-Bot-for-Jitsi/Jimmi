import { createError } from "http_errors/mod.ts";

import AudioFileUrlFinder from "./audio-file-url-finder.ts";
import InvidiousInstanceFinder from "./invidious-instance-finder.ts";

export default class YoutubeAudioUrlFinder {
  invidiousInstanceFinder: InvidiousInstanceFinder;
  instanceListUrl: string;
  constructor(instanceListUrl: string) {
    this.instanceListUrl = instanceListUrl;
    this.invidiousInstanceFinder = new InvidiousInstanceFinder(
      instanceListUrl,
    );
  }

  async findAudioFileUrl(youtubeVideoUrl: string): Promise<string> {
    const invidiousVideoUrl = await this.buildInvidiousUrl(youtubeVideoUrl);
    const audioFileUrlFinder = new AudioFileUrlFinder(invidiousVideoUrl);
    return await audioFileUrlFinder.findAudioFileUrl();
  }

  async buildInvidiousUrl(youtubeVideoUrl: string): Promise<string> {
    const invidiousInstanceUrl: string = await this.invidiousInstanceFinder
      .extractSingleInstanceUrl();
    return invidiousInstanceUrl + "/api/v1/videos/" +
      this.extractVideoParameter(youtubeVideoUrl);
  }

  extractVideoParameter(youtubeVideoUrl: string) {
    const parts: string[] = youtubeVideoUrl.split("?");
    if (parts.length != 2) {
      throw createError(400, "Malformed Youtube Video URL detected.");
    }
    const params: URLSearchParams = new URLSearchParams(parts[1]);
    if (!params.has("v")) {
      throw createError(400, "Malformed Youtube Video URL detected.");
    }
    return params.get("v");
  }
}

const youtubeAudioUrlFinder: YoutubeAudioUrlFinder = new YoutubeAudioUrlFinder(
  "https://api.invidious.io/instances.json",
);

const url: string = await youtubeAudioUrlFinder.findAudioFileUrl(
  "https://www.youtube.com/watch?v=PWr8pM6GzhY&ab_channel=OneFootballEnglish",
);

console.log(url);
