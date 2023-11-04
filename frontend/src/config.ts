import ModeratorPlugin from "./plugins/ModeratorPlugin";
import MusicPlugin from "./plugins/MusicPlugin";

/**
 * Some configuration to easily adjust instance settings
 */
export const config = {
  default: {
    jitsiDisplayName: "DJ Jim", // default name when joining a new conference
    initialVolume: 20, // default initial audio volume
  },
  repoUrl: "https://github.com/p-fruck/Jimmi",
  url: "https://app.jimmi.party", // the redirect url when clicking on the navbar logo
  logo: "/jimmi.svg", // location of the logo displayed in navbar
  plugins: [MusicPlugin, ModeratorPlugin], // list of all plugins
}
