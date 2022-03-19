import { Errors } from './errors.ts';
import ErrorGenerator from './error-generator.ts';
import { InvidiousData, InvidiousInstance } from './invidious.interfaces.ts';

export default class InvidiousIstanceFinder {
  private instanceListUrl: string;
  constructor(instanceListUrl: string) {
    this.instanceListUrl = instanceListUrl;
  }

  /**
   * Finds an invidious instance url for the currently set instance list url
   *
   * @returns The invidious instance url
   *
   * @throws Errors.UNEXPECTED_OR_NO_RESPONSE
   * Thrown if no response or an invalid response was received
   *
   * @throws Errors.NO_SUITABLE_INVIDIOUS_INSTANCE
   * Thrown if no suitable invidious instance was found
   */
  async findInvidiousInstanceUrl(): Promise<string> {
    const instanceList: InvidiousData[] = await this.fetchInstanceList();
    const filteredOrderedInstanceList = this.extractFilteredOrderedInstances(
      instanceList,
    );
    const instance: InvidiousData = this.extractSingleInstance(
      filteredOrderedInstanceList,
    );
    return this.extractSingleInstanceUrl(instance);
  }

  /**
   * Sets the instance list url used to retrieve an instance list from
   *
   * @param instanceListUrl - The instance list url
   */
  setInstanceListUrl(instanceListUrl: string): void {
    this.instanceListUrl = instanceListUrl;
  }

  /**
   * Fetches an instance list
   *
   * @returns The instance list, instance data entries are stripped of names
   *
   * @throws Errors.UNEXPECTED_OR_NO_RESPONSE
   * Thrown if no response or an invalid response was received
   */
  private async fetchInstanceList(): Promise<InvidiousData[]> {
    try {
      const res: Response = await fetch(this.instanceListUrl, {
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
      const json: InvidiousInstance[] = await res.json();
      return json.map((instance) => instance[1]);
    } catch {
      throw new ErrorGenerator().createNamedError(
        Errors.UNEXPECTED_OR_NO_RESPONSE,
      );
    }
  }

  /**
   * Filters an instance list
   *
   * @param instanceList - The instance list to filter
   * @returns The filtered instance list
   */
  private extractFilteredOrderedInstances(
    instanceList: InvidiousData[],
  ): InvidiousData[] {
    const filteredInstanceList = instanceList.filter(
      this.isValidInstance,
    );
    return filteredInstanceList;
  }

  /**
   * Extracts the first instance from an instance list, if there is any instance in it
   *
   * @param instanceList - The instance list
   * @returns The first instance of the list
   *
   * @throws Errors.NO_SUITABLE_INVIDIOUS_INSTANCE
   * Thrown if no suitable invidious instance was found
   */
  private extractSingleInstance(instanceList: InvidiousData[]): InvidiousData {
    if (instanceList.length === 0) {
      throw new ErrorGenerator().createNamedError(
        Errors.NO_SUITABLE_INVIDIOUS_INSTANCE,
      );
    }
    return instanceList[0];
  }

  /**
   * Extracts the url from an invidious instance
   *
   * @param instance - The invidious instance
   * @returns The extracted url
   */
  private extractSingleInstanceUrl(instance: InvidiousData): string {
    return instance.uri;
  }

  /**
   * Checks if an invidious instance matches certain criteria
   *
   * @param instance - The invidious instance
   * @returns True if the instance matches all criteria, False if the instance does not match all criteria
   */
  private isValidInstance(instance: InvidiousData): boolean {
    if (instance.type != 'https') {
      return false;
    }
    if (instance.api != false) {
      return false;
    }
    if (instance.uri === 'https://yewtu.be') {
      return false;
    }
    return true;
  }
}
