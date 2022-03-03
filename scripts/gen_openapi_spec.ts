#!/usr/bin/env -S deno run --no-check --allow-read --allow-write --import-map import_map.json
import { dirname, join } from 'std/path/mod.ts';
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
 * @returns A translated path devided by the operating systems delimeter
 */
function translatePaths(...paths: string[]) {
  const __dirname = dirname(import.meta.url);
  const backendDir = join(__dirname, '..', 'backend');
  return paths.map((path) => join(backendDir, ...path.split('/')).substring(5));
}

const swaggerDefinition = {
  info: {
    title: 'Hello World', // Title (required)
    version: '1.0.0', // Version (required)
    description: 'A sample API', // Description (optional)
  },
  host: `localhost:8000`, // Host (optional)
  basePath: '/api', // Base path (optional)
};

const options = {
  swaggerDefinition,
  // Path to the API docs (all files with swagger definitions)
  // Note that this path is relative to the backend directory.
  apis: translatePaths('src/app.ts'),
};

const swaggerSpec = swaggerDoc(options);

Deno.writeTextFileSync(Deno.args[0], JSON.stringify(swaggerSpec, null, 2));
