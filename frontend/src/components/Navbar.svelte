<script lang="ts">
  import { push } from "svelte-spa-router";
  import { _ } from "svelte-i18n";
  import { config } from "../config";

  function leave() {
    push("/");
  }
</script>

<header class="bg-indigo-500 text-lightgray-600 body-font">
  <div class="container p-2 mx-auto flex flex-wrap p-1 flex-col md:flex-row items-center">
    <a
      href={config.url}
      class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
    >
      <img src={config.logo} alt="Logo" class="w-16 h-16" />
      <span class="ml-3 text-white text-xl font-mono">JIMMI</span>
    </a>
    <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
      <!-- Place links here -->
    </nav>
    <button
      on:click={leave}
      class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
      >{$_("general.leave")}
      <svg
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        class="w-4 h-4 ml-1"
        viewBox="0 0 24 24"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</header>
