<h1 align="center">
  Hi, I'm JIMMI!
  <br />
</h1>
<div align="center">
  <small>Built with ❤️ and 🍺 by
    <a href="https://github.com/antonplagemann">Anton</a>,
    <a href="https://github.com/p-fruck">Philipp</a>,
    <a href="https://github.com/piuswalter">Pius</a>,
    <a href="https://github.com/tjarbo">Tjark</a>,
    <a href="https://github.com/Simon-Walz">Simon</a> and
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
</p>

# 🤖 Who is Jimmi?

Welcome to Jimmi, the Jitsi Integrated Musicbot Management Interface. Jimmi aims to provide an easy way to bring some music to your Jitsi conference 🎶.

# 🚧 Refactoring

During their `Software Engineering II` lession five students decided to put their combined effort into refactoring and enhancing Jimmi. The goals of this project are the following:

## Improve code structure and architecture

The old code structure has much room for improvements and enhancement. The new code will be written in a cleaner and leaner way and will be better documented.

In contrast to the old approach which required a browser-plugin to circumvent the [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/de/docs/Web/HTTP/CORS) restrictions, a backend written in [Deno](https://github.com/denoland/deno) will handle the requests and make it even simpler for less tech-savvy people to use Jimmi.

## Modularity

Instead of writing everything as a single codebase, reusable components will be moved to their own repository and will be published, so other developers can repurpose them if they want.

## Stability

The old codebase had very weak error handling which led to many issues. During this refactoring error handling will be much improved and unit tests will be written to automatically test functions and ensure they are working as expected.

# 🎨 Your ideas

This is a free and open source project aiming to be beneficial to the community. If you have any ideas or suggestions feel free to publish your thoughts in our [discussions](https://github.com/Music-Bot-for-Jitsi/Jimmi/discussions) section.
