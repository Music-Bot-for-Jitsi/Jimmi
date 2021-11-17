<script lang="ts">
  import { onMount } from "svelte";
  import { _ } from "svelte-i18n";
  import { querystring } from "svelte-spa-router";
  import { parse } from "qs";

  import type { ChatEvent } from "../models/ChatEvent";
  import type { JimmiApi } from "../models/JimmiApi";
  import type { IJimmiCommands } from "../models/JimmiPlugin";
  import Jitsi from "../components/Jitsi.svelte";
  import Navbar from "../components/Navbar.svelte";
  import Spinner from "../components/Spinner.svelte";
  import { config } from "../config";

  export let params: { instance: string; room: string; }; // SPA url parameters

  $: query = <{ password?: string }> parse($querystring);

  let jitsi: Jitsi;
  let isJoined: boolean;
  let jimmiApi: JimmiApi | null;

  const commands: IJimmiCommands = {};

  function onMessage(event: CustomEvent<ChatEvent>) {
    if (event.detail.text.startsWith("!")) {
      // register chat commands of all plugins
      const [cmd] = event.detail.text.split(" ");
      if (cmd in commands) {
        commands[cmd](event.detail);
      }
    }
  }

  onMount(async () => {
    const options = {
      hosts: {
        domain: params.instance,
        muc: `conference.${params.instance}`, // FIXME: use XEP-0030
      },
      bosh: `https://${params.instance}/http-bind?room=${params.room}`,
    };
    await jitsi.joinConference(options); // jimmiApi is initialized during function call

    const cmdRegex = new RegExp(/^\w+$/); // matches a single alphanumeric word including underscore
    config.plugins
      .map((plugin) => new plugin(jimmiApi!))
      .forEach((plugin) => {
        Object.keys(plugin.commands || {}).forEach((rawCmd) => {
          const prefixed = `!${rawCmd}`; // cmd must be prefixed

          if (!cmdRegex.test(rawCmd)) {
            // ToDo: Proper error handling
            console.error(
              `Invalid command: "${rawCmd}" provided by plugin "${plugin.meta.name}" is not a valid command name!`
            );
          } else if (prefixed in commands) {
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
  <div class="flex flex-col items-center justify-center">
    <Spinner>
      <p class="p-5">{$_("general.connecting")}...</p>
    </Spinner>
  </div>
{/if}
<div class:hidden={!isJoined}>
  <Jitsi
    roomName={params.room}
    bind:this={jitsi}
    bind:isJoined
    bind:jimmiApi
    bind:conferencePassword={query.password}
    on:message={onMessage}
  />
</div>
