import type JitsiParticipant from "types/jitsi/JitsiParticipant";

interface IJitsiMessageFn {
  (message: unknown, to?: string | undefined): void;
}

export class ChatEvent {
  #text: string;
  #participant: JitsiParticipant;
  #respond: IJitsiMessageFn;
  #isPrivateMessage: boolean;

  constructor(
    text: string,
    participant: JitsiParticipant,
    isPrivateMessage: boolean,
    respond: IJitsiMessageFn,
  ) {
    this.#text = text;
    this.#participant = participant;
    this.#isPrivateMessage = isPrivateMessage;
    this.#respond = respond;
  }

  /**
   * The message sent to the chat
   */
  get text(): string {
    return this.#text;
  }

  /**
   * Returns parameters of a given command.
   *
   * Example:
   *  If #text is `!cmd example one`, the array ['example', 'one'] is returned.
   *
   * @returns The parameter array
   */
  get params(): string[] {
    const [, ...params] = this.#text.split(' ');
    return params;
  }

  /**
   * The participant who executed the command
   */
  get participant(): JitsiParticipant {
    return this.#participant;
  }

  respond(message: string) {
    if (this.#isPrivateMessage) {
      this.#respond(message, this.#participant.getId());
    } else {
      this.#respond(message);
    }
  }
}
