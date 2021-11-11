<script lang="ts">
  import { onMount } from "svelte";
  import type { Video } from "../models/Video";
  import { config } from '../config';

  let gainNode: GainNode;
  let audio: HTMLAudioElement;
  export const queue: Video[] = [];

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
   * Play a new video or resume playback of current media stream
   *
   * @param video - The video to playback. If no video is provided, the current stream is resumed.
   */
  export async function play(video?: Video) {
    if (video) {
      audio.src = video.source;
    }
    await audio.play();
  }

  /**
   * Called when local audio ends playing. If queue contains further tracks, the first one is played.
   */
  function onAudioEnded() {
    if (queue.length > 0) {
      play(queue.shift());
    }
  }

  onMount(initAudio);
</script>

<audio crossorigin="anonymous" controls on:ended={onAudioEnded} bind:this={audio} />
