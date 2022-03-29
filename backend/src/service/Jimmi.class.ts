import type { Page } from 'puppeteer/mod.ts';
import config from '../configuration/environment.ts';

// deno-lint-ignore no-explicit-any
type ExposableFunction = (arg0: any) => any;

class Jimmi {
  public readonly id: string;
  private isInitalized = false;
  private botName = config.botname;

  private instance: string | null = null;
  private roomName: string | null = null;

  private isAudioPlaying = false;
  private queue: string[] = [];
  private currentTrack: string | null = null;

  constructor(private page: Page) {
    this.id = crypto.randomUUID();
  }

  /**
   * Initialize the browser page.
   * @returns
   */
  async init(debug = false): Promise<void> {
    if (this.isInitalized) return;
    await this.page.goto(config.browser.bridge, { waitUntil: 'load' });

    if (debug) {
      this.page
        .on(
          'console',
          (msg) => console.log(`${msg.type().slice(0, 3).toUpperCase()} ${msg.text()}`),
        )
        .on('pageerror', ({ msg }) => console.log(msg))
        .on('response', (res) => console.log(`${res.status()} ${res.url()}`))
        .on('requestfailed', (req) => console.log(`${req.failure().errorText} ${req.url()}`));
    }

    this.isInitalized = true;
  }

  /**
   * Join conference on a given instance and room.
   * Will reset the audioplay if a song is currently being played.
   *
   * @param domain - domain of jitsi instance
   * @param roomName - name of the room
   * @returns Jimmi instance
   */
  async join(domain: string, roomName: string): Promise<ThisType<Jimmi>> {
    if (this.instance !== null && this.roomName) {
      await this.page.goto(config.browser.bridge, { waitUntil: 'load' });
    }

    const { gain } = config;
    await this.page.evaluate(
      `joinConference('${domain}', '${roomName}', '${this.botName}', ${gain})`,
    );
    this.instance = domain;
    this.roomName = roomName;

    await this.exposeListenerFunction(this.onAudioEnded);
    await this.exposeListenerFunction(this.participantKickedOut);
    return this;
  }

  /** *********************
   *       GETTERS
   * ********************* */

  /**
   * Status overview about the instance.
   */
  get status() {
    return {
      id: this.id,
      isPlaying: this.isAudioPlaying,
      conference: this.conference,
      currentTrack: this.currentTrack,
      queueLength: this.queue.length,
    };
  }

  /**
   * Overview about music.
   */
  get music() {
    let status = 'stopped';
    if (this.currentTrack !== null) status = this.isAudioPlaying ? 'playing' : 'paused';

    return {
      status,
      queue: this.queue,
      current: this.currentTrack,
    };
  }

  /**
   * Overview about the joined conference
   */
  get conference() {
    return {
      name: this.botName,
      instance: this.instance,
      room: this.roomName,
    };
  }

  /** *********************
   *    MUSIC CONTROL
   * ********************* */

  /**
   * Continue playing or play the given song.
   *
   * @param url - url to song
   * @returns Jimmi instance
   */
  async play(url?: string): Promise<ThisType<Jimmi>> {
    if (url === undefined && this.currentTrack !== null) {
      await this.page.evaluate('void audio.play()');
    } else if (url !== undefined) {
      await this.page.evaluate(`playAudio('${url}')`);
      this.currentTrack = url;
    } else {
      this.playNextSong();
    }

    this.isAudioPlaying = this.currentTrack !== null;
    return this;
  }

  /**
   * Play the oldest song in the queue if available.
   * @returns Jimmi instance
   */
  async playNextSong(): Promise<ThisType<Jimmi>> {
    const url = this.queue.shift();
    if (url === undefined) return this;
    await this.play(url);
    return this;
  }

  /**
   * Pause the current song.
   *
   * @returns Jimmi instance
   */
  async pause(): Promise<ThisType<Jimmi>> {
    await this.page.evaluate('void audio.pause()');
    this.isAudioPlaying = false;
    return this;
  }

  /**
   * Stop the current song.
   *
   * @returns Jimmi instance
   */
  async stop(): Promise<ThisType<Jimmi>> {
    await this.page.evaluate('stopAudio()');
    this.currentTrack = null;
    this.isAudioPlaying = false;
    return this;
  }

  /** *********************
   *    MUSIC QUEUE
   * ********************* */

  /**
   * Add url to queue and start playing if no song is played.
   *
   * @param url - url to mp3 file
   * @returns Jimmi instance
   */
  async addToQueue(url: string): Promise<ThisType<Jimmi>> {
    this.queue.push(url);
    if (!this.isAudioPlaying) await this.playNextSong();
    return this;
  }

  /**
   * Remove item at given index from queue.
   *
   * @param index - item at index to remove
   * @returns Jimmi instance
   */
  removeFromQueue(index: number): ThisType<Jimmi> {
    this.queue.splice(index, 1);
    return this;
  }

  /**
   * Clear the current queue.
   *
   * @returns Jimmi instance
   */
  clearQueue(): ThisType<Jimmi> {
    this.queue = [];
    return this;
  }

  /** *********************
   *   EVENT HANDLING
   * ********************* */

  /**
   * Shortcut to expose a function and add an event listener.
   *
   * @param fn - The function to expose
   */
  private async exposeListenerFunction(fn: ExposableFunction): Promise<void> {
    // Expose a function to the frontend
    await this.page.exposeFunction(fn.name, fn.bind(this));

    // Add event listener to the jitsi api
    await this.page.evaluate(`api.addListener('${fn.name}', ${fn.name})`);
  }

  /**
   * Called each time the audio element ends its current track.
   * Responsible for adding the next item from the queue.
   */
  private onAudioEnded(): void {
    if (this.queue.length == 0) {
      this.currentTrack = null;
      this.isAudioPlaying = false;
      return;
    }
    this.playNextSong();
  }

  /**
   * Detect when participant gets kicked out of the meeting. If the bot gets
   * kicked out, it will reset itself.
   *
   * @param event - The participant kicked event
   */
  private async participantKickedOut(event: { kicked: { local: boolean } }): Promise<void> {
    if (!event.kicked.local) return;
    this.currentTrack = null;
    this.queue = [];
    this.isAudioPlaying = false;
    this.roomName = this.instance = null;
    await this.page.reload();
  }
}

export default Jimmi;
