<script lang="ts">
  import { createEventDispatcher, onDestroy } from "svelte";
  import { _ } from "svelte-i18n";

  // ToDo: Replace with official types once https://github.com/jitsi/lib-jitsi-meet/pull/1682 is ready
  import type JitsiConference from "types/jitsi/JitsiConference";
  import type JitsiConnection from "types/jitsi/JitsiConnection";
  import type { JitsiConferenceOptions } from "types/jitsi/JitsiConnection";
  import type { InitOptions, JitsiMeetJSType } from "types/jitsi/JitsiMeetJS";
  import type JitsiParticipant from "types/jitsi/JitsiParticipant";
  import type JitsiLocalTrack from "types/jitsi/modules/RTC/JitsiLocalTrack";

  import Audio from "../components/Audio.svelte";
  import Participant from "./Participant.svelte";
  import { ChatEvent } from "../models/ChatEvent";
  import { JimmiApi } from "../models/JimmiApi";
  import { config } from "../config";

  /**
   * Boolean indicating whether the connection to the given conference has been established
   */
  export let isJoined = false;

  /**
   * Name of the conference to join, has to be specified by the parent component
   */
  export let roomName: string;

  /**
   * Jimmi API object. This will only be initialized when joinConference is invoked
   */
  export let jimmiApi: JimmiApi | null;

  export let conferencePassword: string = "";

  let audio: Audio; // audio component binding
  let connection: JitsiConnection;
  let conference: JitsiConference;
  let localTracks: JitsiLocalTrack[] = []; // local audio and video tracks for jitsi

  const dispatch = createEventDispatcher();
  $: participants = <JitsiParticipant[]>[];

  let JitsiMeetJS: JitsiMeetJSType;

  // container for lib-jitsi-meet.js, which is dynamically included from the given instance
  let scriptContainer: HTMLDivElement;

  /**
   * Helper function to update list of reactive participants
   */
  function updateParticipants() {
    participants = conference.getParticipants();
  }

  /**
   * Cleanup function, should be called before closing the component
   */
  function unload() {
    for (let i = 0; i < localTracks.length; i++) {
      localTracks[i].dispose();
    }
    if (conference) {
      conference.leave();
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
      conference.addTrack(localTracks[i]);
    }
  }

  /**
   * Register certain event listeners and dispatch events as component events
   */
  function registerEventListeners() {
    // register real message event listeners
    const dispatchChatEvent = (from: string, msg: string, isPrivate: boolean) =>
      dispatch(
        "message",
        new ChatEvent(
          msg,
          conference.getParticipantById(from),
          isPrivate,
          conference.sendMessage.bind(conference)
        )
      );

    conference.addEventListener(JitsiMeetJS.events.conference.PRIVATE_MESSAGE_RECEIVED, ((
      from: string,
      msg: string
    ) => dispatchChatEvent(from, msg, true)) as any);
    conference.addEventListener(JitsiMeetJS.events.conference.MESSAGE_RECEIVED, ((
      from: string,
      msg: string
    ) => dispatchChatEvent(from, msg, false)) as any);
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
    conference.addEventListener(JitsiMeetJS.events.conference.MESSAGE_RECEIVED, dummyListener);

    // unregister dummy listener after one second. ToDo: Consider cleaner method
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(1000);
    conference.removeEventListener(JitsiMeetJS.events.conference.MESSAGE_RECEIVED, dummyListener);

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
    conference = connection.initJitsiConference(roomName.toLowerCase(), confOptions);
    conference.setDisplayName(config.default.jitsiDisplayName);
    conference.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, onConferenceJoined);
    conference.on(JitsiMeetJS.events.conference.USER_JOINED, updateParticipants);
    conference.on(JitsiMeetJS.events.conference.USER_LEFT, updateParticipants);
    conference.on(JitsiMeetJS.events.conference.DISPLAY_NAME_CHANGED, updateParticipants);
    conference.join(conferencePassword);
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

  async function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Wait until lib-jitsi-meet has been loaded
   */
  async function waitForLibJitsi(): Promise<JitsiMeetJSType> {
    const libjitsi = (window as any).JitsiMeetJS;
    if (typeof libjitsi !== "undefined") {
      return libjitsi;
    }
    await sleep(100);
    return waitForLibJitsi();
  }

  /**
   * Establish a connection to the given jitsi instance and join a conference
   *
   * @param options - Object specifying the jitsi instance, xmpp-http-bind, etc. ToDo: Fix type
   */
  export async function joinConference(options: any) {
    let script = document.createElement("script");
    script.src = `https://${options.hosts.domain}/libs/lib-jitsi-meet.min.js`;
    scriptContainer?.append(script);

    JitsiMeetJS = await waitForLibJitsi();
    JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.WARN);

    window.addEventListener("beforeunload", unload);
    window.addEventListener("unload", unload);

    const initOptions: InitOptions = {
      disableAudioLevels: true,
      disableThirdPartyRequests: true,
      enableAnalyticsLogging: false,
    };

    JitsiMeetJS.init(initOptions);
    connection = new JitsiMeetJS.JitsiConnection(undefined, null, options);

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
      .then(updateLocalTracks as any) // ToDo: Fix type mismatch or wait for Jitsi team :)
      .catch((error) => {
        throw error;
      });

    jimmiApi = new JimmiApi(audio, this);
  }

  /**
   * Simple wrapper to send messages to the public jitsi chat
   *
   * @param msg - The message to send
   */
  export function sendMessage(msg: string) {
    conference.sendMessage(msg);
  }

  /**
   * Called when component closes (e.g. when page is switched). Used to clean up the conference.
   */
  onDestroy(() => {
    unload();
  });
</script>

<div bind:this={scriptContainer} />

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
