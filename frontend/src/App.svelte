<script>
  import Home from "@/components/Home.svelte";
  import { fade } from "svelte/transition";

  let name = "World";
</script>

<main transition:fade>
  <Home {name} />
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
