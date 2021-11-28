import { JitsiConferenceEvents } from "../types/jitsi/JitsiConferenceEvents.d";
import type { IJimmiCommandMap, IJimmiTranslation } from "../models/JimmiPlugin";
import { JimmiPlugin } from "../models/JimmiPlugin";
// import JitsiParticipant from "../types/jitsi/JitsiParticipant.d";

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

  onUserJoined(participantId: string) {
    const { conference } = this.api;
    const participant = conference.getParticipantById(participantId);
    if (participant && conference.isModerator() && conference.getParticipants().length === 1) {
      participant.setRole('moderator');
    }
  }
}
