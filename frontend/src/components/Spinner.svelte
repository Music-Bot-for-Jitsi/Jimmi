<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
  <div class="ml-5 w-20 h-20 border-4 border-indigo-600 rounded-full loader" />
  <slot />
</div>

<style>
  @keyframes loader-rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .loader {
    border-right-color: transparent;
    animation: loader-rotate 1s linear infinite;
  }
</style>
