<script lang="ts">
  import { onMount } from "svelte";
  import { queue } from "../stores";

  export let initialVolume = 20;
  let gainNode: GainNode;
  let audio: HTMLAudioElement;
  /**
   * Function to get current gain value in percent
   *
   * @returns {number} - The gain in percent
   */
  function getGain() {
    return Math.floor(gainNode.gain.value * 100);
  }

  /**
   * Set the gain value and unmute if gain > 0
   *
   * @param {number} gain - The gain value in percent
   */
  function setGain(gain) {
    gain = (gain / 100).toPrecision(3);
    // normalize gain to be between 0 and 1
    gainNode.gain.value = [0, gain, 1].sort()[1];
    // if (gain) unmute();
  }

  /**
   * Initialize audio context with gain node
   */
  function initAudio() {
    const audioContext = new AudioContext();
    const track = audioContext.createMediaElementSource(audio);
    gainNode = audioContext.createGain();
    const destStream = audioContext.createMediaStreamDestination();
    setGain(initialVolume);

    track.connect(gainNode).connect(destStream);

    navigator.mediaDevices.getUserMedia = async function () {
      await audioContext.resume();
      return destStream.stream;
    };
  }

  /**
   * Take an url to an audio file and use it as microphone input
   *
   * @param {string} url - The url to play back
   */
  export async function playAudio(url) {
    await audio.pause();
    // unmute();
    audio.setAttribute("src", url);
    await audio.play();
  }

  /**
   * Called when local audio ends playing
   */
  function onAudioEnded() {
    if ($queue.length > 0) {
      audio.src = $queue[0].source;
    }
  }

  /**
   * Handles play event when queue is forced to be overwritten
   */
  queue.subscribe((queue) => {
    if (audio) { // handle audio not initialized yet
      audio.src = queue[0].source;
      audio.play();
    }
  });

  onMount(initAudio);
</script>

<audio crossorigin="anonymous" controls on:ended={onAudioEnded} bind:this={audio} />
