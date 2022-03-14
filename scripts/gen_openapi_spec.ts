#!/usr/bin/env -S deno run --no-check=remote --allow-read=. --allow-write=. --import-map import_map.json
import { dirname, fromFileUrl, join } from 'std/path/mod.ts';
import { expandGlobSync } from 'std/fs/mod.ts';
import { swaggerDoc } from 'swagger-doc/mod.ts';

if (Deno.args.length !== 1) {
  console.log('Usage: ./gen_openapi_spec.ts <outputfile>.json');
  Deno.exit(1);
}

/**
 * Simple helper function that recursively descends into the backend api folder
 * and retrieves a list of files that might contain openapi documentation.
 *
 * @returns A list of all typescript files in the backend api folder.
 */
function getApiFiles(): string[] {
  const __dirname = fromFileUrl(dirname(import.meta.url));
  const globPattern = join(__dirname, '..', 'backend', 'src', 'api', '**', '*.ts');
  return [...expandGlobSync(globPattern)].map((entry) => entry.path);
}

const swaggerDefinition = {
  info: {
    title: 'Jimmi API',
    version: '1.0.0',
    description: 'The JIMMI backend REST api',
  },
  basePath: '/api',
};

const options = {
  swaggerDefinition,
  // Path to the API docs (all files with swagger definitions)
  // Note that this path is relative to the backend directory.
  apis: getApiFiles(),
};

const swaggerSpec = swaggerDoc(options);

Deno.writeTextFileSync(Deno.args[0], JSON.stringify(swaggerSpec, null, 2));
