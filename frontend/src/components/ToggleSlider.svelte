<script lang="ts">
    export let checked = false;
    export let onClick = () => {};
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="flex items-center cursor-pointer">
    <!-- toggle -->
    <div class="relative">
        <input id="toogleButton" type="checkbox" class="hidden" on:click={onClick} bind:checked />
        <!-- path -->
        <div class="toggle-path bg-gray-200 w-9 h-5 rounded-full shadow-inner" />
        <!-- crcle -->
        <div
            class="toggle-circle absolute w-3.5 h-3.5 bg-white rounded-full shadow inset-y-0 left-0"
        />
    </div>
    <div class="ml-3 text-gray-700 font-medium">
        <slot />
    </div>
</label>

<style>
    .toggle-path {
        transition: background 0.3s ease-in-out;
    }
    .toggle-circle {
        top: 0.2rem;
        left: 0.25rem;
        transition: all 0.3s ease-in-out;
    }
    input:checked ~ .toggle-circle {
        transform: translateX(100%);
    }
    input:checked ~ .toggle-path {
        @apply bg-indigo-500;
    }
</style>
