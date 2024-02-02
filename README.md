<h1 align="center">
  <br />
  <img src="https://raw.githubusercontent.com/Music-Bot-for-Jitsi/Jimmi/main/frontend/public/jimmi.svg" alt="Jimmi" width="200"></a>
  <br />
  Hi, I'm JIMMI!
  <br />
</h1>
<div align="center">
  <small>Built with ❤️ and 🍺 by
    <a href="https://github.com/piuswalter">Pius</a>,
    <a href="https://github.com/tjarbo">Tjark</a>,
    <a href="https://github.com/p-fruck">Philipp</a> and
    <a href="https://github.com/Music-Bot-for-Jitsi/Jimmi/graphs/contributors">contributors</a>
  </small>
</div>

---

<h4 align="center">A music bot interface for your meeting in <a href="https://jitsi.org/" target="_blank">Jitsi</a>.</h4>

<p align="center">
  <a href="https://github.com/Music-Bot-for-Jitsi/Jimmi/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/Music-Bot-for-Jitsi/Jimmi" />
  </a>
  <a href="https://github.com/Music-Bot-for-Jitsi/Jimmi/stargazers">
      <img src="https://img.shields.io/github/stars/Music-Bot-for-Jitsi/Jimmi" />
  </a>
  <a href="https://github.com/Music-Bot-for-Jitsi/Jimmi/issues">
    <img src="https://img.shields.io/github/issues/Music-Bot-for-Jitsi/Jimmi" />
  </a>
  <a href="https://github.com/Music-Bot-for-Jitsi/Jimmi/wiki/FAQ">
    <img src="https://img.shields.io/badge/Questions%3F-FAQ-32a852" />
  </a>
  <a href="https://meet.jit.si/">
    <img src="https://img.shields.io/badge/Built%20for-Jitsi%20Meet-5e87d4" />
  </a>
  <a href="https://app.jimmi.party/">
    <img src="https://img.shields.io/badge/https://-app.jimmi.party-6366f1" />
  </a>
</p>

# :robot: Who is Jimmi?

Do you remember [JIM](https://github.com/p-fruck/jim/)? The Jitsi Integrated Musicbot?

I am Jimmi! Your Jitsi Integrated Musicbot Management Interface.

# :tada: How does Jimmi help me?

An awesome Jitsi Meet Party has never been so easy! - Go to [app.jimmi.party](https://app.jimmi.party/) fill in the party location and start listening to your music with your friends!

:warning: Remember that you have to install the browser extension before. See below for how to install.

# :sparkles: Features

At the moment Jimmi only supports simple music playback but he already has an extension system which offers much room for improvement. For the beginning, this is how music playback looks like in the management interface:

<p align="center">
  <img alt="Media playback in management interface" src="https://user-images.githubusercontent.com/30511472/146185113-9a45c745-fec3-45eb-97d4-b3fe1001dec6.png"></img>
</p>

# :rocket: Get started!

Caused by the [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/de/docs/Web/HTTP/CORS) restrictions you need a browser extension to load external YouTube videos into your session.

There have been approaches to circumvent this CORS issues, e.g. the [v2 release of Jimmi](https://github.com/Music-Bot-for-Jitsi/Jimmi/releases/tag/v2.0.0) that you can treet like an April Fool because it was unmaintainable and very resource intensive. For the sake of simplicity and security, it has been decided to deal with the CORS restrictions using the declarativeNetRequest feature of Manifest V3.

Jimmi should support all browsers supporting Manifest V3. If your browser doesn't work, feel free to submit an issue.

## Installation

Installation of the extension depends on your browser and is easiest in Chromium/Google Chrome which is explained below:

1. Call [chrome://extensions/](chrome://extensions/) in your browser
2. On the right hand side of the navigation bar activate the *Developer mode*
3. Then press *Load unpacked*
4. Select the `browser` folder
5. Navigate to [app.jimmi.party](https://app.jimmi.party/) and let the party begin!

## Usage

Jimmi is a chat bot. You can ask him to `!play some music` which will search `some music` on YouTube (or rather [invidious](https://invidious.io/)). For a full list of features, use the `!help` command.

To ensure access to audio devices, please use the form on the app startpage to connect to a Jitsi instance. If you just reload the page `https://app.jimmi.party/#/bot/my.jitsi.instance/my-conference` (or connect to it directly) you might run into issues with [autoplay](https://goo.gl/xX8pDD).

**Caveats**

Jimmi uses a randomized list of Invidious instances to play back music. Those instances are run by volunteers and might suffer from bugs or downtime. If you notice that a specific instance is not functioning, please report this as an issue.

Another unresolved issue is that googlevideo (where the music tracks are fetched from) might return 403 forbidden for some videos (idk why). In that case you wont be able to play that specific video and have to choose another song - Sorry for the inconvenience.

Jitsi is complicated. YouTube too. If you experience any further problems, feel free to report problems using GitHub issues or discussions and submit pull requests if you have the required knowledge ;)

## How it works

Jimmi acts as a regular Jitsi user that would join your meeting. The main difference is, that his microphone output is simulated :astonished: Jimmi uses the integrated [MusicPlugin](frontend/src/plugins/MusicPlugin.ts) to interact with the [invidious](https://invidious.io/) (selfhosted YouTube) API and fetch video information. The audio track of the requested YouTube video is then embedded into the Jimmi web interface and piped into the microphone input. That way, Jimmi can broadcast the music stream to all participants!

## ToDo's

- A ton :smile:
- Add further plugins (Jokes, mini-games)
- Audio playback: Select sampling rate & Codec
- Invidious Instances: Implement instance chooser
- Web Interface: Add msuic selection into GUI
- Error Handling: Show proper messages for common issues (CORS, missing extension, audio device access, missing video stream, ...)

# :blue_book: License

Jimmi is licensed under `GNU Affero General Public License v3.0`!
