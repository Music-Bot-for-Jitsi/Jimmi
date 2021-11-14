import type Audio from "./components/Audio.svelte";
import type Jitsi from "./components/Jitsi.svelte";
import type { Track } from "./Track";

export class JimmiApi {
  constructor(private audio: Audio, private jitsi: Jitsi) {
    this.play.bind(this);
    this.mute.bind(this);
    this.unmute.bind(this);
  }

  async play() {
    await this.audio.play();
    this.unmute();
  }

  mute() {
    // ToDo: implement
  }

  unmute() {
    // ToDo: implement
  }

  sendMessage(msg: string) {
    this.jitsi.sendMessage(msg);
  }

  get queue(): Track[] {
    return this.audio.queue;
  }

  get currentTrack(): Track | undefined {
    return this.audio.getCurrentTrack();
  }

  set currentTrack(track: Track | undefined) {
    this.audio.play(track);
  }

  forward(seconds: number) {
    this.audio.forward(seconds);
  }

  get volume(): number {
    return this.audio.getGain();
  }

  set volume(volume: number) {
    this.audio.setGain(volume);
    if (volume) {
      this.unmute();
    }
  }
}
