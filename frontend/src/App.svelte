<script lang="ts">
  import { isLoading } from 'svelte-i18n'
  import Router from 'svelte-spa-router'
  import { wrap } from 'svelte-spa-router/wrap'
  import { setupI18n } from './i18n'
  import Home from './routes/Home.svelte'
  import NotFound from './routes/NotFound.svelte'
  import "./tailwind.css"

  setupI18n();

  const routes = {
    '/': Home,
    '/bot/:instance/:room': wrap({
      asyncComponent: () => import('./routes/Bot.svelte'), // async import to reduce bundle size
    }),
    '*': NotFound, // Catch-All
  }
</script>

<main class="h-screen">
  {#if !$isLoading}
    <Router {routes}/>
  {/if}
</main>
