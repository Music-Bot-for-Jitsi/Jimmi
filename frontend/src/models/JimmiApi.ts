import type Audio from "./components/Audio.svelte";
import type Jitsi from "./components/Jitsi.svelte";
import type { Video } from "./Video";

export class JimmiApi {
  constructor(private audio: Audio, private jitsi: Jitsi) {
    this.play.bind(this);
    this.mute.bind(this);
    this.unmute.bind(this);
  }

  async play(video?: Video) {
    await this.audio.play(video);
    this.unmute();
  }

  mute() {
    // ToDo: implement
  }

  unmute() {
    // ToDo: implement
  }

  get queue(): Video[] {
    return this.audio.queue;
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
