<script lang="ts">
  import { createEventDispatcher, onDestroy } from "svelte";
  import { _ } from "svelte-i18n";

  // ToDo: Replace with official types once https://github.com/jitsi/lib-jitsi-meet/pull/1682 is ready
  import type JitsiConference from "src/types/jitsi/JitsiConference";
  import type JitsiConnection from "src/types/jitsi/JitsiConnection";
  import type { JitsiConferenceOptions } from "src/types/jitsi/JitsiConnection";
  import type { InitOptions, JitsiMeetJSType } from "src/types/jitsi/JitsiMeetJS";
  import type JitsiLocalTrack from "src/types/jitsi/modules/RTC/JitsiLocalTrack";

  import Audio from "./Audio.svelte";
  import Participant from "./Participant.svelte";

  /**
   * Boolean indicating whether the connection to the given conference has been established
   */
  export let isJoined = false;

  /**
   * Name of the conference to join, has to be specified by the parent component
   */
  export let roomName: string;

  let audio: Audio; // audio component binding
  let connection: JitsiConnection;
  let room: JitsiConference;
  let localTracks: JitsiLocalTrack[] = []; // local audio and video tracks for jitsi

  const dispatch = createEventDispatcher();
  $: participants = [];

  const JitsiMeetJS: JitsiMeetJSType = (window as any).JitsiMeetJS;
  JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.WARN);

  /**
   * Helper function to update list of reactive participants
   */
  function updateParticipants() {
    participants = room.getParticipants();
  }

  /**
   * Cleanup function, should be called before closing the component
   */
  function unload() {
    for (let i = 0; i < localTracks.length; i++) {
      localTracks[i].dispose();
    }
    if (room) {
      room.leave();
    }
    if (connection) {
      connection.disconnect();
    }
  }

  /**
   * Handles local tracks.
   *
   * @param tracks - Array with JitsiTrack objects
   */
  function updateLocalTracks(tracks?: JitsiLocalTrack[]) {
    if (tracks) {
      localTracks = tracks;
    }
    if (!isJoined) {
      return;
    }
    for (let i = 0; i < localTracks.length; i++) {
      room.addTrack(localTracks[i]);
    }
  }

  /**
   * Register certain event listeners and dispatch events as component events
   */
  function registerEventListeners() {
    // register real message event listener
    room.addEventListener(JitsiMeetJS.events.conference.MESSAGE_RECEIVED, ((
      from: string,
      msg: string
    ) => {
      dispatch("message", { text: msg });
    }) as any);
  }

  /**
   * Executed when conference is joined successfully
   */
  async function onConferenceJoined() {
    console.info("Successfully joined conference!");
    isJoined = true;

    updateLocalTracks();

    // register dummy listener to mark old messages as read
    const dummyListener = () => {};
    room.addEventListener(JitsiMeetJS.events.conference.MESSAGE_RECEIVED, dummyListener);

    // unregister dummy listener after one second. ToDo: Consider cleaner method
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(1000);
    room.removeEventListener(JitsiMeetJS.events.conference.MESSAGE_RECEIVED, dummyListener);

    // register real event listeners
    registerEventListeners();
  }

  /**
   * Called when connection to jitsi instance is established successfully
   */
  function onConnectionSuccess() {
    console.info("Connection established successfully");
    const confOptions: JitsiConferenceOptions = {
      startAudioMuted: false,
    };
    room = connection.initJitsiConference(roomName.toLowerCase(), confOptions);
    room.setDisplayName("DJ Jim");
    room.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, onConferenceJoined);
    room.on(JitsiMeetJS.events.conference.USER_JOINED, updateParticipants);
    room.on(JitsiMeetJS.events.conference.USER_LEFT, updateParticipants);
    room.on(JitsiMeetJS.events.conference.DISPLAY_NAME_CHANGED, updateParticipants);
    room.join("");
  }

  /**
   * Called when connection fails
   */
  function onConnectionFailed() {
    alert("Connection failed! Please report this issue");
    console.error("Connection Failed!");
  }

  /**
   * Called when the bot disconnects
   */
  function disconnect() {
    console.info("disconnecting!");
    connection.removeEventListener(
      JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
      onConnectionSuccess
    );
    connection.removeEventListener(
      JitsiMeetJS.events.connection.CONNECTION_FAILED,
      onConnectionFailed
    );
    connection.removeEventListener(
      JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
      disconnect
    );
  }

  /**
   * Establish a connection to the given jitsi instance and join a conference
   *
   * @param options - Object specifying the jitsi instance, xmpp-http-bind, etc.
   */
  export function joinConference(options: JitsiConferenceOptions) {
    window.addEventListener("beforeunload", unload);
    window.addEventListener("unload", unload);

    const initOptions: InitOptions = {
      disableAudioLevels: true,
      disableThirdPartyRequests: true,
      enableAnalyticsLogging: false,
    };

    JitsiMeetJS.init(initOptions);
    connection = new JitsiMeetJS.JitsiConnection(null, null, options);

    connection.addEventListener(
      JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
      onConnectionSuccess
    );
    connection.addEventListener(
      JitsiMeetJS.events.connection.CONNECTION_FAILED,
      onConnectionFailed
    );
    connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED, disconnect);

    connection.connect();

    JitsiMeetJS.createLocalTracks({ devices: ["audio"] })
      .then(updateLocalTracks)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Called when component closes (e.g. when page is switched). Used to clean up the conference.
   */
  onDestroy(() => {
    unload();
  });
</script>

<div class="container mx-auto">
  <div class="flex flex-row flex-wrap py-4">
    <div class="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
      <Audio bind:this={audio} />
    </div>
    <div class="w-full sm:w-1/3 md:w-1/4 px-2">
      {#if participants.length}
        <h1 class="text-gray-900 text-3xl title-font font-medium mb-4">
          {$_("general.participants")}
        </h1>
      {/if}
      {#each participants as participant}
        <Participant {participant} />
      {/each}
    </div>
  </div>
</div>
