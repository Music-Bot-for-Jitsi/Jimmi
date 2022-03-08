import { createError } from "http_errors/mod.ts";

import { InvidiousData, InvidiousInstance } from "./invidious.interfaces.ts";

export default class InvidiousIstanceFinder {
  instanceListUrl: string;
  constructor(instanceListUrl: string) {
    this.instanceListUrl = instanceListUrl;
  }

  async findInstanceList(): Promise<InvidiousData[]> {
    const res: Response = await fetch(this.instanceListUrl, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
      },
    });
    if (res.status != 200) {
      throw createError(502, "Could not find Invidious instance list.");
    }
    const json: InvidiousInstance[] = await res.json();
    return json.map((instance) => instance[1]);
  }

  async extractFilteredOrderedInstances(): Promise<InvidiousData[]> {
    const instanceList = await this.findInstanceList();
    const filteredInstanceList = instanceList.filter(
      this.isValidInstance,
    );
    return filteredInstanceList;
  }

  async extractSingleInstance(): Promise<InvidiousData> {
    const urlList = await this.extractFilteredOrderedInstances();
    if (urlList.length === 0) {
      throw createError(502, "Could not find suitable Invidious instance.");
    }
    return urlList[0];
  }

  async extractSingleInstanceUrl(): Promise<string> {
    const instance = await this.extractSingleInstance();
    return instance.uri;
  }

  isValidInstance(instance: InvidiousData): boolean {
    if (instance.type != "https") {
      return false;
    }
    if (instance.api != false) {
      return false;
    }
    if (instance.uri === "https://yewtu.be") {
      return false;
    }
    return true;
  }
}
