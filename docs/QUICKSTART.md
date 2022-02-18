# Getting started

## Cloning the repository
Clone the repository:  
  
`git clone https://github.com/Music-Bot-for-Jitsi/Jimmi`  

## Installing Dependencies

### Installing Deno runtime

Install Deno for your preferred operating system as described in the [Deno Installation Manual](https://deno.land/manual/getting_started/installation).  

### Installing Trex package manager

Use Deno to install the Trex package manager using the following command:  
  
`deno install -A --unstable --import-map=https://deno.land/x/trex/import_map.json -n trex --no-check https://deno.land/x/trex/cli.ts`  
  
Further information on Trex can be found [here](https://deno.land/x/trex@v1.10.0).  

### Installing Velociraptor utilities
Velociraptor is a script runner for Deno, inspired by npm's package.json scripts. It offers a similar experience but with out-of-the-box support for declarative Deno CLI options, environment variables, concurrency and git hooks.

Use the following command to install Velociraptor from deno.land:  
  
`deno install -qAn vr https://deno.land/x/velociraptor@1.4.0/cli.ts`
  
Use the following command to install Velociraptor from nest.land:  
  
`deno install -qAn vr https://x.nest.land/velociraptor@1.4.0/cli.ts`

