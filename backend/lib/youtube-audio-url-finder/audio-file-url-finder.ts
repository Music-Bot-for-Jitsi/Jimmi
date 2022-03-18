import { Errors } from './errors.ts';
import ErrorGenerator from './error-generator.ts';
import {
  AudioFileAdaptiveFormat,
  AudioFileData,
} from './invidious.interfaces.ts';

export default class AudioFileUrlFinder {
  private invidiousVideoUrl: string;

  constructor() {
    this.invidiousVideoUrl = '';
  }

  /**
   * Sets the invidious video url used to receive data about a video
   *
   * @param invidiousVideoUrl - The invidious video url
   */
  setInvidiousVideoUrl(invidiousVideoUrl: string): void {
    this.invidiousVideoUrl = invidiousVideoUrl;
  }

  /**
   * Finds an audio file url (googlevideo) for the currently set invidious video url
   *
   * @returns The audio file url

   *
   * @throws Errors.UNEXPECTED_OR_NO_RESPONSE
   * Thrown if no response or an invalid response was received
   *
   * @throws Errors.NO_SUITABLE_ADAPTIVE_FORMATS
   * Thrown if no supported audio format was received

   */
  async findAudioFileUrl(): Promise<string> {
    const audioFileData: AudioFileData = await this.fetchAudioFileData();
    return this.extractAudioFileUrl(audioFileData);
  }

  /**
   * Collects data about the audio file from the invidious api
   *
   * @returns Data of the audio file
   *
   * @throws Errors.UNEXPECTED_OR_NO_RESPONSE
   * Thrown if no supported audio format was received
   */
  private async fetchAudioFileData(): Promise<AudioFileData> {
    try {
      const res: Response = await fetch(this.invidiousVideoUrl, {
        method: 'GET',
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36',
        },
      });
      if (res.status != 200) {
        throw new ErrorGenerator().createNamedError(
          Errors.UNEXPECTED_OR_NO_RESPONSE,
        );
      }
      const json: AudioFileData = await res.json();
      return json;
    } catch {
      throw new ErrorGenerator().createNamedError(
        Errors.UNEXPECTED_OR_NO_RESPONSE,
      );
    }
  }

  /**
   * Extracts an audio file url from audio file data
   *
   * @param audioFileData The audio file data
   * @returns The audio file url
   *
   * @throws Errors.NO_SUITABLE_ADAPTIVE_FORMATS
   * Thrown if no supported audio format was received
   */
  private extractAudioFileUrl(audioFileData: AudioFileData): string {
    const adaptiveFormatList: AudioFileAdaptiveFormat[] =
      audioFileData.adaptiveFormats;
    if (adaptiveFormatList.length === 0) {
      throw new ErrorGenerator().createNamedError(
        Errors.NO_SUITABLE_ADAPTIVE_FORMATS,
      );
    }
    return adaptiveFormatList[0].url;
  }
}
