export default class AudioFileUrlFinder {
  invidiousVideoUrl: string;

  constructor(invidiousVideoUrl: string) {
    this.invidiousVideoUrl = invidiousVideoUrl;
  }

  async findAudioFileInfo() {
    const res: Response = await fetch(this.invidiousVideoUrl, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
      },
    });
    return res.json().then((json) => {
      const adaptiveFormatList = json.adaptiveFormats;
      return adaptiveFormatList;
    });
  }

  async findAudioFileUrl(): Promise<string> {
    const adaptiveFormatList = await this.findAudioFileInfo();
    return adaptiveFormatList[0]["url"];
  }
}
