<script lang="ts">
  import jimmiApi from '../api.ts';

  export let id: string; // ID of the Jimmi instance

  export let queue: string[] = []; // music queue

  interface State {
    status: string;
    queue: string[];
  }

  const Actions = {
    PAUSE: 'paused',
    PLAY: 'playing',
    STOP: 'stopped',
  }

  let isAudioPaused = false;

  export function updateState(state: State) {
    isAudioPaused = state.status !== Actions.PLAY;
    queue = state.queue;
  }

  /**
   * Toggle the current music playback state
   */
  async function togglePause() {
    const res = await jimmiApi.instancesIdMusicPatch(id, {
      status: isAudioPaused ? Actions.PLAY : Actions.PAUSE,
    });
    updateState(res);
  }

  function playNext(id) {}

  // initially fetch current playback state and queue
  jimmiApi.instancesIdMusicGet(id).then((res) => updateState(res));
</script>

<div class="w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
  <div class="flex justify-center text-xs font-semibold text-gray-500 px-4 py-2">
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
        on:click={togglePause}
      >
        {#if isAudioPaused}
          <svg
            class="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg
          >
        {:else}
          <svg
            class="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><polygon points="7,3 7,21" /><polygon points="17,3 17,21" /></svg
          >
        {/if}
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
  </div>

  <ul class="text-xs sm:text-base divide-y border-t cursor-default">
    {#each queue as track, idx}
      <li class="flex items-center space-x-3 hover:bg-gray-100">
        <button
          on:click={() => playNext(idx)}
          class="p-3 hover:bg-green-500 group focus:outline-none"
        >
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
        <div class="flex-1">{track}</div>
      </li>
    {/each}
  </ul>
</div>
