import type { JimmiApi } from "./JimmiApi";

interface IJimmiPluginMeta {
  name: string,
  description: string,
  version: string,
}

export interface IJimmiCommands {
  [key: string]: (params: string[]) => any;
}

export abstract class JimmiPlugin {
  constructor(protected api: JimmiApi) {}

  abstract readonly meta: IJimmiPluginMeta;

  /**
   * Register callback functions for chat commands. Note that cmd has to
   * match a single word and will be prefixed with an exclamation mark.
   */
  abstract readonly commands?: IJimmiCommands;
}
