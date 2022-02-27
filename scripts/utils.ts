import { dirname, join } from 'std/path/mod.ts';

const __dirname = dirname(import.meta.url);

export function translatePath(path: string): string {
  return join(__dirname, ...path.split('/')).replace('file:', '');
}
