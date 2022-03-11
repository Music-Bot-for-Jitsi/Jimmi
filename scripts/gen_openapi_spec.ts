#!/usr/bin/env -S deno run --no-check --allow-read --allow-write --import-map import_map.json
import { dirname, join, fromFileUrl } from 'std/path/mod.ts';
import { swaggerDoc } from 'swagger-doc/mod.ts';

if (Deno.args.length !== 1) {
  console.log('Usage: ./gen_openapi_spec.ts <outputfile>.json');
  Deno.exit(1);
}

/**
 * Simple helper function to resolve all relative paths from the
 * backend folder and make paths resolvable on all platforms.
 *
 * @param paths - The paths to translate
 * @returns A translated path divided by the operating systems delimiter
 */
function translatePaths(...paths: string[]) {
  const __dirname = fromFileUrl(dirname(import.meta.url));
  const backendDir = join(__dirname, '..', 'backend');
  return paths.map((path) => join(backendDir, ...path.split('/')));
}

const swaggerDefinition = {
  info: {
    title: 'Jimmi API',
    version: '1.0.0',
    description: 'A sample API',
  },
  basePath: '/api', 
}

const options = {
  swaggerDefinition,
  // Path to the API docs (all files with swagger definitions)
  // Note that this path is relative to the backend directory.
  apis: translatePaths('src/app.ts'),
};

const swaggerSpec = swaggerDoc(options);

Deno.writeTextFileSync(Deno.args[0], JSON.stringify(swaggerSpec, null, 2));
