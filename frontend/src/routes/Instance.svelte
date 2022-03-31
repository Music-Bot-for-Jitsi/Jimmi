<script lang="ts">
  import { _ } from 'svelte-i18n';
  import MusicControl from '../components/MusicControl.svelte';
  import jimmiApi from '../api.ts';

  export let id: string; // ID of the Jimmi instance

  let playbackUrl = '';

  let queue: string[] = [];

  let musicControl: MusicControl;

  /**
   * enqueue the song specified in the input field
   */
  async function enqueue(): Promise<void> {
    const res = await jimmiApi.instancesIdMusicPost(id, {
      url: playbackUrl,
    });
    musicControl.updateState(res);
  }
</script>

<div class="lg:w-2/3 w-full mx-auto sm:space-y-8 space-y-8">
  <div class="flex sm:flex-row flex-col items-end px-8 sm:space-x-4 sm:px-0">
    <div class="relative flex-grow w-full">
      <label for="full-name" class="leading-7 text-sm text-gray-600"
        >{$_('routes.instance.playbackUrl')}</label
      >
      <input
        bind:value={playbackUrl}
        type="text"
        id="full-name"
        name="full-name"
        class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
      />
    </div>

    <button
      on:click={enqueue}
      class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >{$_('routes.instance.queue')}</button
    >
  </div>
  <MusicControl bind:this={musicControl} bind:id bind:queue />
</div>
