<script lang="ts">
  import { config } from "../config";
</script>

<footer class="text-gray-600 body-font absolute bottom-0 w-screen">
  <div class="bg-gray-100 ">
    <div class="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
      <div class="flex items-center md:justify-start justify-center text-gray-900">
        <a href={config.url} class="ml-3 text-xl">JIMMI</a>
        <p class="text-sm text-gray-500 ml-4 pl-4 border-l-2 border-gray-200 sm:py-2 sm:mt-0">
          Still under heavy development
        </p>
      </div>
      <div class="sm:ml-auto sm:py-2 sm:mt-0 mt-4 sm:text-left text-center text-gray-500 text-sm">
        <p class="text-sm text-gray-500">
          Fork me on
          <a
            href={config.repoUrl}
            class="text-indigo-500 ml-1"
            target="_blank"
            rel="noopener noreferrer">Github</a
          >
        </p>
      </div>
    </div>
  </div>
</footer>
