<script lang="ts">
  import { onMount, setContext } from "svelte";
  import { _ } from "svelte-i18n";
  import Jitsi from "../components/Jitsi.svelte";
  import Navbar from "../components/Navbar.svelte";
  import Spinner from "../components/Spinner.svelte";
  import MusicPlugin from "../plugins/music";

  export let params: { instance: string; room: string }; // spa url parameters

  let jitsi: Jitsi;
  let isJoined: boolean;

  const plugins = [MusicPlugin]; // all plugins to register
  const commands: { [key: string]: CallableFunction } = {};
  plugins.forEach((plugin) => {
    Object.keys(plugin.commands || {}).forEach((rawCmd) => {
      const prefixed = `!${rawCmd}`; // cmd has to be prefixed
      if (prefixed in commands) {
        console.warn(
          `Duplicate command: "${prefixed}" provided by plugin "${plugin.meta.name}" is already used!`
        );
      } else {
        commands[prefixed] = plugin.commands[rawCmd];
      }
    });
  });

  function onMessage(event: CustomEvent<{ text: string }>) {
    if (event.detail.text.startsWith("!")) {
      // register chat commands of all plugins
      const [cmd, ...params] = event.detail.text.split(" ");
      if (cmd in commands) {
        commands[cmd](params);
      }
    }
  }

  onMount(() => {
    const options = {
      hosts: {
        domain: params.instance,
        muc: `conference.${params.instance}`, // FIXME: use XEP-0030
      },
      bosh: `https://${params.instance}/http-bind?room=${params.room}`,
    };
    jitsi.joinConference(options);
  });
</script>

<Navbar />
{#if !isJoined}
  <div class="flex flex-col items-center justify-center h-full">
    <Spinner />
    <p class="p-5">{$_("general.connecting")}...</p>
  </div>
{/if}
<div class:hidden={!isJoined}>
  <Jitsi roomName={params.room} bind:this={jitsi} bind:isJoined on:message={onMessage} />
</div>
