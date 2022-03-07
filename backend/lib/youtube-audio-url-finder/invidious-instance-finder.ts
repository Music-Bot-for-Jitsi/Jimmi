export default class InvidiousIstanceFinder {
  instanceListUrl: string;
  constructor(instanceListUrl: string) {
    this.instanceListUrl = instanceListUrl;
  }

  async findInstanceList() {
    const res: Response = await fetch(this.instanceListUrl, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
      },
    });
    return res.json();
  }

  async extractFilteredOrderedInstances() {
    const instanceList = await this.findInstanceList();
    const filteredInstanceList = instanceList.filter(
      this.isValidInstance,
    );
    return filteredInstanceList;
  }

  async extractSingleInstance() {
    const urlList = await this.extractFilteredOrderedInstances();
    return urlList[1];
  }

  async extractSingleInstanceUrl() {
    const instance = await this.extractSingleInstance();
    return instance[0];
  }

  isValidInstance(instance: any): boolean {
    if (instance[1]["type"] != "https") {
      return false;
    }
    if (instance[1]["api"] != false) {
      return false;
    }
    return true;
  }
}
