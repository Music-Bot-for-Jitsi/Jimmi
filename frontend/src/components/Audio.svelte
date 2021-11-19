<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import type { Track } from "../models/Track";
  import { config } from "../config";

  let gainNode: GainNode;
  let audio: HTMLAudioElement | null; // binding of the main audio element
  let currentTime = 0; // binding of current time
  let duration = 0; // binding of duration

  export const queue: Track[] = [];
  $: currentTrack = <Track | null>null;
  $: isThumbnailInitialized = false; // Indicator if thumbnail is initialized.

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
      await audio?.play();
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
    if (!audio) return;
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

  /**
   * Converts time to string in format hh:mm:ss, mm:ss or just ss. The exact format is determined
   * using the duration parameter. If no duration is specified, time is used as duration.
   *
   * Example: time=5 with duration=70 results in 00:05 instead of just 05.
   *
   * @param time - The time to be formatted in seconds
   * @param duration - The duration to which the the format should be adapted
   * @param returns The formatted string [hh:][mm:]ss
   */
  function formatTime(time: number, duration = time) {
    if (!duration) return "--:--";
    let hours = <string | number>Math.trunc(time / 3600);
    let minutes = <string | number>Math.trunc((time % 3600) / 60);
    let seconds = <string | number>Math.trunc(time % 60);

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (duration > 3600) {
      return `${hours}:${minutes}:${seconds}`;
    } else if (duration > 60) {
      return `${minutes}:${seconds}`;
    } else {
      return seconds;
    }
  }

  onMount(initAudio);
</script>

<audio
  class="hidden"
  src={currentTrack?.source || undefined}
  on:canplaythrough={() => play()}
  on:ended={onAudioEnded}
  bind:this={audio}
  bind:currentTime
  bind:duration
  crossorigin="anonymous"
  controls
/>

<div class="max-w-xl bg-white rounded-lg shadow-lg overflow-hidden">
  <div class="relative">
    <div class="h-80">
      <img
        transition:fade
        src={currentTrack?.thumbnailUrl}
        alt="Video thumbnail"
        class="object-fill"
        class:invisible={!isThumbnailInitialized}
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
        on:load={() => (isThumbnailInitialized = true)}
      />
    </div>

    <div
      class="absolute p-4 inset-0 flex flex-col justify-end bg-gradient-to-b from-transparent to-gray-900 backdrop backdrop-blur-5 text-white"
    >
      <h3 class="font-bold">{currentTrack?.title || "N/A"}</h3>
    </div>
  </div>
  <div>
    <div class="relative h-1 bg-gray-200">
      <input
        type="range"
        min="0"
        max={duration}
        bind:value={currentTime}
        class="absolute h-full w-full"
      />
    </div>
  </div>
  <div class="flex justify-between text-xs font-semibold text-gray-500 px-4 py-2">
    <div>
      {formatTime(currentTime, duration)}
    </div>
    <div class="flex space-x-3 p-2">
      <button class="focus:outline-none">
        <svg
          class="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          ><polygon points="19 20 9 12 19 4 19 20" /><line x1="5" y1="19" x2="5" y2="5" /></svg
        >
      </button>
      <button
        class="rounded-full w-8 h-8 flex items-center justify-center pl-0.5 ring-2 ring-gray-100 focus:outline-none"
      >
        <svg
          class="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg
        >
      </button>
      <button class="focus:outline-none">
        <svg
          class="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          ><polygon points="5 4 15 12 5 20 5 4" /><line x1="19" y1="5" x2="19" y2="19" /></svg
        >
      </button>
    </div>
    <div>
      {formatTime(duration)}
    </div>
  </div>
  <ul class="text-xs sm:text-base divide-y border-t cursor-default">
    {#each queue as track}
      <li class="flex items-center space-x-3 hover:bg-gray-100">
        <button class="p-3 hover:bg-green-500 group focus:outline-none">
          <svg
            class="w-4 h-4 group-hover:text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg
          >
        </button>

        <div class="flex-1">{track.title}</div>
        <div class="text-xs text-gray-400">ToDo: DURATION!</div>
        <button class="focus:outline-none pr-4 group">
          <svg
            class="w-4 h-4 group-hover:text-green-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" /></svg
          >
        </button>
      </li>
    {/each}
  </ul>
</div>
