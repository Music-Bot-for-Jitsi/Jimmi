<script lang="ts">
  import { onMount } from "svelte";
  import type { Track } from "../models/Track";
  import { config } from "../config";

  let gainNode: GainNode;
  let audio: HTMLAudioElement;
  export const queue: Track[] = [];
  $: currentTrack = <Track | null>null;

  /**
   * Retrieve the current gain value in percent
   *
   * @returns The gain in percent
   */
  export function getGain(): number {
    return Math.floor(gainNode.gain.value * 100);
  }

  /**
   * Set the gain value
   *
   * @param gain - The gain value in percent
   */
  export function setGain(gain: number) {
    // normalize gain to be between 0 and 1
    gainNode.gain.value = [0, gain / 100, 1].sort()[1];
  }

  /**
   * Initialize audio context with gain node
   */
  function initAudio() {
    const audioContext = new AudioContext();
    const track = audioContext.createMediaElementSource(audio);
    gainNode = audioContext.createGain();
    const destStream = audioContext.createMediaStreamDestination();
    setGain(config.default.initialVolume);

    track.connect(gainNode).connect(destStream);

    navigator.mediaDevices.getUserMedia = async function () {
      await audioContext.resume();
      return destStream.stream;
    };
  }

  /**
   * Play a new track or resume playback of current media stream
   *
   * @param track - The track to playback. If no track is provided, the current stream is resumed.
   */
  export async function play(track?: Track) {
    if (track) {
      currentTrack = track;
    } else {
      await audio.play();
    }
  }

  export function getCurrentTrack(): Track | null {
    return currentTrack;
  }

  /**
   * Fast forward or rewind the current track.
   *
   * @param seconds - The duration in seconds to forward. Choose a negative value to rewind.
   */
  export function forward(seconds: number) {
    audio.currentTime += seconds;
  }

  /**
   * Called when local audio ends playing. If queue contains further tracks, the first one is played.
   */
  function onAudioEnded() {
    if (queue.length > 0) {
      play(queue.shift());
    } else {
      currentTrack = null;
    }
  }

  onMount(initAudio);
</script>

<audio
  src={currentTrack?.source || undefined}
  on:canplaythrough={() => play()}
  on:ended={onAudioEnded}
  bind:this={audio}
  crossorigin="anonymous"
  controls
/>
