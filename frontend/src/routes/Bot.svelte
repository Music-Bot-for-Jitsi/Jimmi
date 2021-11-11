<script lang="ts">
  import { onMount } from "svelte";
  import { _ } from "svelte-i18n";

  import type { JimmiApi } from "../models/JimmiApi";
  import type { IJimmiCommands } from "../models/JimmiPlugin";
  import Jitsi from "../components/Jitsi.svelte";
  import Navbar from "../components/Navbar.svelte";
  import Spinner from "../components/Spinner.svelte";
  import MusicPlugin from "../plugins/MusicPlugin";

  export let params: { instance: string; room: string }; // SPA url parameters

  let jitsi: Jitsi;
  let isJoined: boolean;
  let jimmiApi: JimmiApi | null;

  const plugins = [MusicPlugin]; // all plugins to register
  const commands: IJimmiCommands = {};

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
    jitsi.joinConference(options); // jimmiApi is initialized during function call

    const cmdRegex = new RegExp(/^\w+$/); // matches a single alphanumeric word including underscore
    plugins
      .map((plugin) => new plugin(jimmiApi!))
      .forEach((plugin) => {
        Object.keys(plugin.commands || {}).forEach((rawCmd) => {
          const prefixed = `!${rawCmd}`; // cmd must be prefixed

          if (!cmdRegex.test(rawCmd)) {
            // ToDo: Proper error handling
            console.error(
              `Invalid command: "${rawCmd}" provided by plugin "${plugin.meta.name}" is not a valid command name!`
            );
          }
          else if (prefixed in commands) {
            // ToDo: Proper error handling
            console.warn(
              `Duplicate command: "${prefixed}" provided by plugin "${plugin.meta.name}" is already used!`
            );
          } else {
            commands[prefixed] = plugin.commands[rawCmd];
          }
        });
      });
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
  <Jitsi
    roomName={params.room}
    bind:this={jitsi}
    bind:isJoined
    bind:jimmiApi
    on:message={onMessage}
  />
</div>
