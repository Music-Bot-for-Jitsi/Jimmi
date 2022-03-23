import type { Page } from 'https://deno.land/x/puppeteer@9.0.2/mod.ts';

type ExposableFunction = (arg0: any) => any;

class Jimmi {
  public readonly id: string;
  private currentTrack: string | null = null;
  private botName = 'DJ Jimmi';

  private instance: string | null = null;
  private roomName: string | null = null;

  private queue: string[] = [];
  private isReady = false;

  constructor(private page: Page) {
    this.id = crypto.randomUUID();
  }

  /**
   * Detect when participant gets kicked out of the meeting. If the bot gets
   * kicked out, he will end the browsing session.
   *
   * @param event - The Participant kicked event
   */
  private async participantKickedOut(event: { kicked: { local: boolean } }): Promise<void> {
    if (!event.kicked.local) return;
    this.roomName = this.instance = null;
    await this.page.reload();
  }

  /**
   * Remove event listener from jitsi api
   *
   * @param fn - The function that has the listener registered
   * @param name - The name of the listening function to remove
   */
  private async removeEventListener(fn: ExposableFunction, name: string): Promise<void> {
    await this.page.evaluate(`api.removeListener('${fn.name}', ${name})`);
  }

  /**
   * Shortcut to expose a function and add an event listener
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
   * Initialize the browser page
   * @returns
   */
  async init(debug = false): Promise<void> {
    if (this.isReady) return;
    await this.page.goto(
      `https://tjarbo.github.io/temp-static-webfiles/Jimmi.bridge.html`,
      {
        waitUntil: 'load',
      },
    );

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

    this.isReady = true;
  }

  /**
   * Join conference on a given instance and room
   * @param domain - domain of jitsi instance
   * @param roomName - name of the room
   * @returns Jimmi instance
   */
  async join(domain: string, roomName: string): Promise<ThisType<Jimmi>> {
    const gain = 0.85;
    await this.page.evaluate(
      `joinConference('${domain}', '${roomName}', '${this.botName}', ${gain})`,
    );
    return this;
  }

  /**
   * Add url to queue and start playing if not song is played
   * @param url - url to mp3 file
   * @returns Jimmi instance
   */
  async addUrlToQueue(url: string): Promise<ThisType<Jimmi>> {
    this.queue.push(url);
    if (!this.isPlaying) await this.playNextSong();
    return this;
  }

  /**
   * Play the oldes song in the queue if available
   * @returns Jimmi instance
   */
  private async playNextSong(): Promise<ThisType<Jimmi>> {
    const url = this.queue.pop();
    if (url === undefined) return this;
    await this.page.evaluate(`playAudio('${url}')`);
    this.currentTrack = url;
    return this;
  }

  /**
   * Status overview about the instance
   */
  get status() {
    return {
      id: this.id,
      name: this.botName,
      isPlaying: this.isPlaying,
      conference: this.conference,
      currentTrack: this.currentTrack,
      queueLength: this.queue.length,
    };
  }

  /**
   * Instance is playing a song
   */
  get isPlaying() {
    return this.currentTrack !== undefined;
  }

  /**
   * Overview about the joined conference
   */
  get conference() {
    return {
      instance: this.instance,
      room: this.roomName,
    };
  }

  /* **********************
   *      EVENT HANDLER
   * **********************/

  /**
   * Called each time the audio element ends its current track.
   * Responsible for adding the next item from the queue.
   */
  private onAudioEnded(): void {
    if (this.queue.length == 0) return void (this.currentTrack = null);
    this.playNextSong();
  }
}

export default Jimmi;
