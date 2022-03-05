[comment]: <> "LTeX: language=en-US"

# Architecture Decisions, Automations

This file describes all used frameworks and packages, the reasoning behind them and all other architectural decisions as well as all used automations.

---

## Packages and Frameworks

### Deno

We use [deno.land](https://deno.land), the evolution of Node.js, as runtime for our TypeScript backend. Compared to [Node.js](https://nodejs.org/en/), Deno allows for much greater granularity when it comes to security permissions and has a good *secure-by-default*-rule set to limit what applications can do if no special permissions given.  
For deployment, we use the [deno compiler](https://deno.land/manual/tools/compiler) to provide a simple executable file that can run Jimmi without installation on all main platforms (Windows, Linux & macOS). The executable will run the backend and serve the static frontend.

### Svelte

[Svelte](https://svelte.dev/) is a lightweight, modern and fast frontend framework. Svelte has some advantages for which we chose it over other frameworks [source](https://daily.dev/blog/building-with-svelte-all-you-need-to-know-before-you-start):

- Instead of doing most of the work in the browser, Svelte does its work when you build the app, and it compiles it to efficient vanilla JavaScript.
- It reduces the overhead of the JavaScript framework you’re using. Compiling Svelte to vanilla JavaScript improves the code readability, enables re-use, and produces a much faster web app.
- Svelte does not require declarative, state-driven code, which the browser has to convert into DOM operations. That means you don’t need to use virtual DOM anymore.

### Snel

[Snel](https://deno.land/x/snel) is a tool/framework to compile Svelte components to JavaScript files using Deno and Svelte to create web applications.
Advantages:

- Simple setup
- Fast compilation
- Hot reloading
- Import maps support
- Support for SCSS and Less out of the box
- TypeScript support

### Opine

[Opine](https://deno.land/x/opine) is a fast, minimalist web framework for Deno ported from [ExpressJS](https://github.com/expressjs/express).
Advantages:

- Robust routing
- Focus on high performance
- Large selection of HTTP helpers including support for downloading / sending files, etags, Content-Disposition, cookies, JSONP etc.
- Support for static serving of assets
- View system supporting template engines
- Content negotiation
- Compatible with SuperDeno for easy server testing
- Supports HTTP proxy middleware with opine-http-proxy

### Trex and Velociraptor

[Trex](https://deno.land/x/trex) is a package management tool for Deno similar to NPM but keeping close to the Deno philosophy. Packages are cached and only one `import_map.json` file is generated.  
[Velociraptor](https://deno.land/x/velociraptor) is a script runner for Deno, inspired by NPM's `package.json` scripts. It offers a similar experience but with out-of-the-box support for declarative Deno CLI options, environment variables, concurrency and git hooks.  
In this project we use Velociraptor to have a single command that starts frontend and backend (or other tasks) in parallel.

### Docker

As an alternative to using the compiled binaries we provide container images that can be used with Docker (or another container runtime). Additionally we provide an example Docker Compose file. The setup process and all details are described [here](./DOCKER.md).

## Automations

### API Client Generation

Our backend has a REST-API in which every endpoint has a swagger API specification, written as JSDoc comments over each endpoint function. [This pipeline](https://github.com/Music-Bot-for-Jitsi/Jimmi/blob/main/.github/workflows/update-API-client.yml) is triggered an any backend change and will automatically generate, commit and push a deno compatible API client using the [openAPI code generator](https://github.com/Music-Bot-for-Jitsi/Jimmi/issues/44). The generated API client is saved as a separate deno module in the repository [jimmi-api-client](https://github.com/Music-Bot-for-Jitsi/jimmi-API-client) which is also included as git submodule in [`frontend/lib/jimmi-api-client`](https://github.com/Music-Bot-for-Jitsi/Jimmi/tree/main/frontend/lib) for easier development.

### SonarCloud SAST

We use SonarCloud as static application security testing (SAST) provider. All new code has to pass a [`Quality Gate`](https://sonarcloud.io/summary/new_code?id=Music-Bot-for-Jitsi_Jimmi) that fails on one of the following conditions:

| Metric | Operator | Value |
|:---:|:---:|:---:|
| Coverage | is less than | 80.0% |
| Duplicated Lines (%) | is greater than | 3.0% |
| Maintainability Rating | is worse than | A |
| Reliability Rating | is worse than | A |
| Security Hotspots Reviewed | is less than | 100% |
| Security Rating | is worse than | A |

The Quality Gate status, among other metrics, are displayed as badges on the [README](https://github.com/Music-Bot-for-Jitsi/Jimmi) page of the main repository. The corresponding [scanning pipeline](https://github.com/Music-Bot-for-Jitsi/Jimmi/blob/main/.github/workflows/sonar.yml) is triggered on each pull request, push to main and also on a weekly basis to check for currently rising security vulnerabilities. SonarCloud is enabled on all (non-forked) repositories in the Jimmi organization.

### Dependabot

We use the GitHub Dependabot automation to keep all dependencies up to date and secure. If there is a known security vulnerability within a dependency, Dependabot will automatically open a pull request for bumping it to a secure version.

### Issue Branches

We use an [automation pipeline](https://github.com/Music-Bot-for-Jitsi/Jimmi/blob/main/.github/workflows/automate-issue-branch.yml) to create branches and pull requests for new issues so that every branch and PR follows the same naming convention and can be tracked back to the originating issue. For every issue, a comment with the command `/cib` will trigger the pipeline and create a new branch and pull request (draft).

### Issue to Project

We use an [automation pipeline](https://github.com/Music-Bot-for-Jitsi/Jimmi/blob/main/.github/workflows/automate-issue-project.yml) to add each new issue to the organization project board (with status `backlog`). This keeps the project board always up to date so that we don't miss any issue.
