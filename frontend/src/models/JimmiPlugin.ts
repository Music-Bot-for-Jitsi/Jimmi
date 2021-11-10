export interface JimmiPlugin {
  meta: {
    name: string,
    description: string,
    version: string,
  },
  /**
   * Register callback functions for chat commands. Note that cmd has to
   * match a single word and will be prefixed with an exclamation mark.
   */
  commands?: {
    [key: string]: (params: string[]) => void
  }
}
