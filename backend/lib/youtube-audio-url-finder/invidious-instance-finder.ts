export default class IstanceFinder {
  instanceListUrl: string;
  constructor(instanceListUrl: string) {
    this.instanceListUrl = instanceListUrl;
  }

  async findInstanceList() {
    const res = await fetch(this.instanceListUrl, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
      },
    });
    return res;
  }
}
