<script lang="ts">
  import { isLoading } from 'svelte-i18n/';
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
        <footer>
          <Link to="instance/abc123">Dashboard</Link>
        </footer>
      </div>
    </Router>
  </main>
{/if}

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
