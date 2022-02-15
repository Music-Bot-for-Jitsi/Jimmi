[comment]: <> "LTeX: language=en-US"
<!-- markdownlint-disable MD033 -->

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

<h3 align="center">🔒 SonarCloud Monitored</h3>
<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=Music-Bot-for-Jitsi_Jimmi">
    <img src="https://sonarcloud.io/api/project_badges/measure?project=Music-Bot-for-Jitsi_Jimmi&metric=alert_status" alt="Quality Gate Status" />
  </a>
  <a href="https://sonarcloud.io/summary/new_code?id=Music-Bot-for-Jitsi_Jimmi">
    <img src="https://sonarcloud.io/api/project_badges/measure?project=Music-Bot-for-Jitsi_Jimmi&metric=sqale_rating" alt="Maintainability Rating" />
  </a>
  <a href="https://sonarcloud.io/summary/new_code?id=Music-Bot-for-Jitsi_Jimmi">
    <img src="https://sonarcloud.io/api/project_badges/measure?project=Music-Bot-for-Jitsi_Jimmi&metric=reliability_rating" alt="Reliability Rating" />
  </a>
  <a href="https://sonarcloud.io/summary/new_code?id=Music-Bot-for-Jitsi_Jimmi">
    <img src="https://sonarcloud.io/api/project_badges/measure?project=Music-Bot-for-Jitsi_Jimmi&metric=security_rating" alt="Security Rating" />
  </a>
</p>
<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=Music-Bot-for-Jitsi_Jimmi">
    <img src="https://sonarcloud.io/api/project_badges/measure?project=Music-Bot-for-Jitsi_Jimmi&metric=ncloc" alt="Lines of Code" />
  </a>
  <a href="https://sonarcloud.io/summary/new_code?id=Music-Bot-for-Jitsi_Jimmi">
    <img src="https://sonarcloud.io/api/project_badges/measure?project=Music-Bot-for-Jitsi_Jimmi&metric=vulnerabilities" alt="Vulnerabilities" />
  </a>
  <a href="https://sonarcloud.io/summary/new_code?id=Music-Bot-for-Jitsi_Jimmi">
    <img src="https://sonarcloud.io/api/project_badges/measure?project=Music-Bot-for-Jitsi_Jimmi&metric=sqale_index" alt="Technical Debt" />
  </a>
</p>
<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=Music-Bot-for-Jitsi_Jimmi">
    <img src="https://sonarcloud.io/api/project_badges/measure?project=Music-Bot-for-Jitsi_Jimmi&metric=code_smells" alt="Code Smells" />
  </a>
  <a href="https://sonarcloud.io/summary/new_code?id=Music-Bot-for-Jitsi_Jimmi">
    <img src="https://sonarcloud.io/api/project_badges/measure?project=Music-Bot-for-Jitsi_Jimmi&metric=coverage" alt="Coverage" />
  </a>
  <a href="https://sonarcloud.io/summary/new_code?id=Music-Bot-for-Jitsi_Jimmi">
    <img src="https://sonarcloud.io/api/project_badges/measure?project=Music-Bot-for-Jitsi_Jimmi&metric=duplicated_lines_density" alt="Duplicated Lines (%)" />
  </a>
  <a href="https://sonarcloud.io/summary/new_code?id=Music-Bot-for-Jitsi_Jimmi">
    <img src="https://sonarcloud.io/api/project_badges/measure?project=Music-Bot-for-Jitsi_Jimmi&metric=bugs" alt="Bugs" />
  </a>
</p>

# 🤖 Who is Jimmi?

Welcome to Jimmi, the Jitsi Integrated Musicbot Management Interface. Jimmi aims to provide an easy way to bring some music to your Jitsi conference 🎶.

# 🚧 Refactoring

During their `Software Engineering II` lesson, five students decided to put their combined effort into refactoring and enhancing Jimmi. The goals of this project are the following:

## Improve code structure and architecture

The old code structure has much room for improvements and enhancement. The new code will be written in a cleaner and leaner way and will be better documented.

In contrast to the old approach which required a browser-plugin to circumvent the [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/de/docs/Web/HTTP/CORS) restrictions, a backend written in [Deno](https://github.com/denoland/deno) will handle the requests and make it even simpler for less tech-savvy people to use Jimmi.

## Modularity

Instead of writing everything as a single codebase, reusable components will be moved to their own repository and will be published, so other developers can repurpose them if they want.

## Stability

The old codebase had very weak error handling which led to many issues. During this refactoring error handling will be much improved, and unit tests will be written to automatically test functions and ensure they are working as expected.

# 🎨 Your ideas

This is a free and open source project aiming to be beneficial to the community. If you have any ideas or suggestions feel free to publish your thoughts in our [discussions](https://github.com/Music-Bot-for-Jitsi/Jimmi/discussions) section.
