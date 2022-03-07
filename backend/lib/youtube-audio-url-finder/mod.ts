import AudioFileUrlFinder from "./audio-file-url-finder.ts";
import InvidiousInstanceFinder from "./invidious-instance-finder.ts";

export default class FullUrlFinder {
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
    const params: URLSearchParams = new URLSearchParams(youtubeVideoUrl);
    const invidiousInstanceUrl: string = await this.invidiousInstanceFinder
      .extractSingleInstanceUrl();

    return "https://" + invidiousInstanceUrl + "/api/v1/videos/" +
      params.get("https://www.youtube.com/watch?v");
  }
}

const fullUrlFinder = new FullUrlFinder(
  "https://api.invidious.io/instances.json",
);

const url = await fullUrlFinder.findAudioFileUrl(
  "https://www.youtube.com/watch?v=cIY95KCnnNk&ab_channel=Dream",
);

console.log(url);
