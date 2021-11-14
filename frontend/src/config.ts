import MusicPlugin from "./plugins/MusicPlugin";

/**
 * Some configuration to easily adjust instance settings
 */
export const config = {
  default: {
    jitsiDisplayName: "DJ Jim", // default name when joining a new conference
    initialVolume: 20, // default initial audio volume
  },
  url: "https://jimmi.xyz", // the redirect url when clicking on the navbar logo
  logo: "/jim.svg", // location of the logo displayed in navbar
  plugins: [MusicPlugin], // list of all plugins
}
