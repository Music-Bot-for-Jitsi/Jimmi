<script lang="ts">
    import { _ } from 'svelte-i18n';
    import jimmiApi from '../api.ts';

    export let id: string; // ID of the Jimmi instance

    let playbackUrl = '';

    async function play(): Promise<void> {
        jimmiApi.instancesIdMusicPost(id, {
            url: playbackUrl,
        });
    }
</script>

<div
    class="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end"
>
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
    on:click={play}
        class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >{$_('routes.instance.play')}</button
    >
</div>
