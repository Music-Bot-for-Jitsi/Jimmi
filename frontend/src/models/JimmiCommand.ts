import type { ChatEvent } from "./ChatEvent";
import type { IJimmiExecFunction, JimmiPlugin } from "./JimmiPlugin";

export class JimmiCommand {
  #cmdName: string;
  #pluginId: string;
  #execFunction: IJimmiExecFunction;

  constructor(cmd: string, plugin: JimmiPlugin) {
    this.#cmdName = cmd;
    this.#pluginId = plugin.meta.id;
    if (!plugin.commands) {
      throw new Error("Cannot construct JimmiCommand for plugin without commands")
    }
    this.#execFunction = plugin.commands[this.#cmdName].bind(plugin);
  }

  /**
   * The name of the command, e.g. `play` for command invoked by `!play`
   */
  get name() {
    return this.#cmdName;
  }

  /**
   * The id of the plugin providing this command
   */
  get pluginId() {
    return this.#pluginId;
  }

  /**
   * Execute the command
   *
   * @param event - The custom chat event
   */
  exec(event: CustomEvent<ChatEvent>) {
    this.#execFunction(event.detail);
  }
}
