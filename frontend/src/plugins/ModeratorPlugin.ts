import { JitsiConferenceEvents } from "../types/jitsi/JitsiConferenceEvents.d";
import type { IJimmiCommandMap, IJimmiTranslation } from "../models/JimmiPlugin";
import { JimmiPlugin } from "../models/JimmiPlugin";

export default class ModeratorPlugin extends JimmiPlugin {
  readonly meta = {
    id: "xyz.jimmi.moderator",
    name: "Moderator",
    version: "1.0.0",
  };

  readonly commands?: IJimmiCommandMap | undefined;

  readonly events = {
    [JitsiConferenceEvents.USER_JOINED]: this.onUserJoined,
  }

  translations?: { en: IJimmiTranslation; } | undefined;

  onUserJoined() {
    console.warn("onUserJoined")
  }
}
