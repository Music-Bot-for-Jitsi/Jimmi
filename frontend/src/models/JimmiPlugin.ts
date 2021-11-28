import { _ } from "svelte-i18n";
import type { MessageFormatter, MessageObject } from "svelte-i18n/types/runtime/types";
import type { ChatEvent } from "./ChatEvent";
import type { JimmiApi } from "./JimmiApi";

interface IJimmiPluginMeta {
  id: string,
  name: string,
  version: string,
}

export interface IJimmiTranslationObject {
  [key:string]: string | IJimmiTranslationObject;
}

export interface IJimmiTranslation extends IJimmiTranslationObject {
  description: string;
}

export interface IJimmiCommandFunction {
  (event: ChatEvent): any;
}

export interface IJimmiEventHandler {
  (...params: any): any;
}

export interface IJimmiCommandMap {
  [key: string]: IJimmiCommandFunction;
}

export interface IJimmiEventMap {
  [key: string]: IJimmiEventHandler;
}

export abstract class JimmiPlugin {
  private translator?: MessageFormatter;

  constructor(protected api: JimmiApi) {
    _.subscribe((formatter) => this.translator = formatter);
  }

  abstract readonly meta: IJimmiPluginMeta;

  /**
   * Register callback functions for chat commands. Note that the key has to
   * match a single word and will be prefixed with an exclamation mark.
   */
  abstract readonly commands?: IJimmiCommandMap;

  /**
   * Register callback functions for conference events. Note that the key
   * has match a JitsiConferenceEvent.
   */
  abstract readonly events?: IJimmiEventMap;

  abstract readonly translations?: {
    en: IJimmiTranslation;
  }

  /**
   * Internal translation wrapper for the plugin system. This wrapper shortens the path of the
   * translation key by automatically prepending the key `plugin` and the plugin id to the key.
   *
   * @param translationKey - The key to be translated
   * @param options - Options to format the message
   * @returns The translated string, empty string if the translator wasn't initialized
   */
  protected $t(translationKey: string, options?: Omit<MessageObject, "id">): string {
    if (!this.translator) {
      return "";
    }
    return this.translator(`plugins.${this.meta.id}.${translationKey}`, options);
  }
}
