import YoutubeAudioUrlFinder from "./youtube-audio-url-finder.ts";

const youtubeAudioUrlFinder: YoutubeAudioUrlFinder = new YoutubeAudioUrlFinder(
  "https://api.invidious.io/instances.json",
);

const url: string = await youtubeAudioUrlFinder.findAudioFileUrl(
  "https://www.youtube.com/watch?v=PWr8pM6GzhY&ab_channel=OneFootballEnglish",
);

console.log(url);
