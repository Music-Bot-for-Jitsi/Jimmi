import { _ } from "svelte-i18n";
import type { MessageFormatter } from "svelte-i18n/types/runtime/types";
import type { ChatEvent } from "./ChatEvent";
import type { IJimmiExecFunction, JimmiPlugin } from "./JimmiPlugin";

export class JimmiCommand {
  #cmdName: string;
  #pluginId: string;
  #execFunction: IJimmiExecFunction;
  #translator?: MessageFormatter;

  constructor(cmd: string, plugin: JimmiPlugin) {
    this.#cmdName = cmd;
    this.#pluginId = plugin.meta.id;
    if (!plugin.commands) {
      throw new Error("Cannot construct JimmiCommand for plugin without commands")
    }
    this.#execFunction = plugin.commands[this.#cmdName].bind(plugin);
    // subscribe to svelte i18n translator
    _.subscribe((fmt) => this.#translator = fmt);
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

  /**
   * The translated description of the command
   */
  get description(): string {
    if (this.#translator) {
      return this.#translator(`plugins.${this.pluginId}.commands.${this.#cmdName}.usage`);
    }
    return '';
  }
}
