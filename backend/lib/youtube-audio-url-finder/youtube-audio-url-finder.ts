import { Errors } from "./errors.ts";
import ErrorGenerator from "./error-generator.ts";
import AudioFileUrlFinder from "./audio-file-url-finder.ts";
import InvidiousInstanceFinder from "./invidious-instance-finder.ts";

export default class YoutubeAudioUrlFinder {
  private invidiousInstanceFinder: InvidiousInstanceFinder;
  private audioFileUrlFinder: AudioFileUrlFinder;

  constructor(instanceListUrl: string) {
    this.invidiousInstanceFinder = new InvidiousInstanceFinder(
      instanceListUrl,
    );
    this.audioFileUrlFinder = new AudioFileUrlFinder();
  }

  /**
   * Finds an audio file url (googlevideo) for a given youtube video url
   *
   * @param youtubeVideoUrl The youtube video url
   * @returns The audio file url
   *
   * @throws Errors.MALFORMED_YOUTUBE_URL
   *
   * @throws Errors.UNEXPECTED_OR_NO_RESPONSE
   *
   * @throws Errors.NO_SUITABLE_INVIDIOUS_INSTANCE
   *
   * @throws Errors.NO_SUITABLE_ADAPTIVE_FORMATS
   */
  async findAudioFileUrl(youtubeVideoUrl: string): Promise<string> {
    const invidiousInstanceUrl: string = await this.invidiousInstanceFinder
      .findInvidiousInstanceUrl();
    const invidiousVideoUrl = this.buildInvidiousUrl(
      youtubeVideoUrl,
      invidiousInstanceUrl,
    );
    this.audioFileUrlFinder.setInvidiousVideoUrl(invidiousVideoUrl);
    return await this.audioFileUrlFinder.findAudioFileUrl();
  }

  /**
   * Builds the invidious video data url for a given youtube video url
   * and a given invidious instance url
   *
   * @param youtubeVideoUrl The youtube video url
   * @param invidiousInstanceUrl The invidious instance url
   * @returns The invidious video data url
   *
   * @throws Errors.MALFORMED_YOUTUBE_URL
   *
   * @throws Errors.UNEXPECTED_OR_NO_RESPONSE
   *
   * @throws Errors.NO_SUITABLE_INVIDIOUS_INSTANCE
   */
  private buildInvidiousUrl(
    youtubeVideoUrl: string,
    invidiousInstanceUrl: string,
  ): string {
    return invidiousInstanceUrl + "/api/v1/videos/" +
      this.extractVideoParameter(youtubeVideoUrl);
  }

  /**
   * Extracts the search query parameter that identifies the video from a given youtube
   * video url
   *
   * @param youtubeVideoUrl - The youtube video url
   * @returns The search query parameter that identifies the video
   *
   * @throws Errors.MALFORMED_YOUTUBE_URL
   * Thrown if the youtube url cannot be interpreted
   */
  private extractVideoParameter(youtubeVideoUrl: string) {
    const parts: string[] = youtubeVideoUrl.split("?");
    if (parts.length != 2) {
      throw new ErrorGenerator().createNamedError(Errors.MALFORMED_YOUTUBE_URL);
    }
    const params: URLSearchParams = new URLSearchParams(parts[1]);
    if (!params.has("v")) {
      throw new ErrorGenerator().createNamedError(Errors.MALFORMED_YOUTUBE_URL);
    }
    return params.get("v");
  }
}
