#!/usr/bin/env -S deno run --import-map import_map.json --allow-run
/**
 * A helper script to compile the Deno application for different architectures
 */
import { translatePath } from './utils.ts';

const architectures = [
  'x86_64-unknown-linux-gnu',
  'x86_64-pc-windows-msvc',
  'x86_64-apple-darwin',
  'aarch64-apple-darwin',
];

const basecmd = [
  'deno',
  'compile',
  '--config',
  'deno.json',
  '--import-map=../import_map.json',
  '--no-check',
  '--allow-read',
  '--allow-net',
];

function printHelp() {
  console.error('Usage: ./compile.ts <all|[ARCH]...>');
  console.error(`\nSupported architectures: ${JSON.stringify(architectures)}`);
}

async function compile(architectures: string[]) {
  for (const arch of architectures) {
    const process = await Deno.run({
      cmd: basecmd.concat(
        `--target ${arch} -o ${translatePath('dist/jimmi-' + arch)} ${translatePath('src/app.ts')}`
          .split(' '),
      ),
      cwd: translatePath('../backend'),
      stderr: 'piped',
      stdout: 'piped',
    });
    console.log(new TextDecoder().decode(await process.stderrOutput()));
  }
}

let { args } = Deno;
if (args.length == 0) {
  printHelp();
  Deno.exit(1);
} else if (args.length == 1 && args[0] === 'all') {
  args = architectures;
}

await compile(args);
