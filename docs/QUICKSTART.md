# Getting started

## Cloning the repository

Clone the repository:
  
`git clone --recurse-submodules https://github.com/Music-Bot-for-Jitsi/Jimmi`

## Installing Dependencies

### Installing Deno runtime

Install Deno for your preferred operating system as described in the [Deno Installation Manual](https://deno.land/manual/getting_started/installation).

### Installing Snel compiler for Svelte frontend components

Use Deno to install the Snel compiler for Svelte using the following command:

`deno run --allow-run --allow-read https://deno.land/x/snel/install.ts`
  
This will also install the Trex package manager for you.
Further information on Snel can be found [here](https://github.com/crewdevio/Snel).
Trex may also be installed seperately, e.g. if you only want to run the backend.

### Installing Velociraptor utilities

Velociraptor is a script runner for Deno, inspired by npm's `package.json` scripts. It offers a similar experience but with out-of-the-box support for declarative Deno CLI options, environment variables, concurrency and git hooks.

Use the following command to install Velociraptor from deno.land:
  
`deno install -qAn vr https://deno.land/x/velociraptor/cli.ts`
  
If you are on Windows, make sure to make Velociraptor use a shell that can deal with `&&` (some PowerShell versions can't cope with it).
Instructions on how to set the shell used by Velociraptor can be found [here](https://deno.land/x/velociraptor#shell-scripting).

### Install Chromium Browser

Install a chromium-based browser such as Google Chrome and note down the executable path.

## Create Configuration File

Inside the backend folder copy and rename `.env.example` to `.env` and fill in your desired settings.

## Starting the Application components

### Starting the Backend

Change directory into the backend folder and run the following command:

`deno task start`

The backend service will be available at `http://localhost:{configured-port}`

By default, the configured port for the backend service is port 8000.

### Starting the Frontend

Change directory into the frontend folder and run the following command:

`deno task start`

The frontend service will be available at `http://localhost:{configured-port}`

By default, the configured port for the frontend service is port 3000.

### Starting Frontend and Backend simultaneously with Velociraptor

Change directory into the repository root and run the following command:

`vr start`

The frontend service will be available at `http://localhost:{configured-port}`

The backend service will be available at `http://localhost:{configured-port}`

By default, the configured port for the frontend service is port 3000.

By default, the configured port for the backend service is port 8000.
