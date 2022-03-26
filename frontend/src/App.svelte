<script lang="ts">
  import { isLoading } from 'svelte-i18n';
  import Router from 'svelte-routing/Router.svelte';
  import Route from 'svelte-routing/Route.svelte';
  import Link from 'svelte-routing/Link.svelte';
  import Home from './routes/Home.svelte';
  import Instance from './routes/Instance.svelte';

  export let url = ''; // required by the svelte router
</script>

{#if $isLoading}
  Please wait...
{:else}
  <main>
    <Router {url}>
      <div>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/instance/:id" component={Instance} let:params>
          <Instance id={params.id} />
        </Route>
        <footer class="text-center fixed bottom-0 w-full bg-slate-800 text-gray-200">
          The Footer
        </footer>
      </div>
    </Router>
  </main>
{/if}

<style>

</style>
