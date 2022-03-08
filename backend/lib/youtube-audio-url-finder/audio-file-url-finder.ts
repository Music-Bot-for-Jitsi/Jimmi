import { createError } from "http_errors/mod.ts";

import {
  AudioFileAdaptiveFormat,
  AudioFileData,
} from "./invidious.interfaces.ts";

export default class AudioFileUrlFinder {
  invidiousVideoUrl: string;

  constructor(invidiousVideoUrl: string) {
    this.invidiousVideoUrl = invidiousVideoUrl;
  }

  async findAudioFileData(): Promise<AudioFileData> {
    const res: Response = await fetch(this.invidiousVideoUrl, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
      },
    });
    if (res.status != 200) {
      throw createError(
        502,
        "Unexpected Response from Invidious instance. Check if your provided Youtube Video URL is valid.",
      );
    }
    const json: AudioFileData = await res.json();
    return json;
  }

  async findAudioFileUrl(): Promise<string> {
    const audioFileData: AudioFileData = await this
      .findAudioFileData();
    const adaptiveFormatList: AudioFileAdaptiveFormat[] =
      audioFileData.adaptiveFormats;
    if (adaptiveFormatList.length === 0) {
      throw createError(
        502,
        "Invidious instance could not provide suitable adaptive formats.",
      );
    }
    return adaptiveFormatList[0].url;
  }
}
