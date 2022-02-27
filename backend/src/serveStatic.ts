import { decode as b64d } from 'std/encoding/base64.ts';
import { dirname, extname, join } from 'std/path/mod.ts';
import {
  NextFunction,
  OpineRequest,
  OpineResponse,
  RequestHandler,
  serveStatic,
} from 'opine/mod.ts';

type FileMap = { [key: string]: string };

/**
 * Given an object with base64 encoded values, this function decodes the values and converts them
 * from Uint8Array into a String.
 *
 * @param encodedFiles - The object containing the base64 encoded values
 * @returns A new object containing the decoded values
 */
function decodeValues(encodedFiles: FileMap): FileMap {
  const decodedFiles: FileMap = {};
  const decoder = new TextDecoder();
  for (const path in encodedFiles) {
    decodedFiles[path] = decoder.decode(b64d(encodedFiles[path]));
  }
  return decodedFiles;
}

/**
 * Returns a handler to serve static files passed as an object
 *
 * @param files - FileMap containing the content of the files to serve
 * @returns A handler to serve the given FileMap
 */
function getAssetServer(files: FileMap): RequestHandler {
  const aliases: { [key: string]: string } = {
    '/': '/index.html',
  };

  return (req: OpineRequest, res: OpineResponse, next: NextFunction) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      return next();
    }

    let { path } = req;
    if (path in aliases) {
      path = aliases[path];
    }

    if (path in files) {
      if (!res.get('Content-Type')) {
        res.type(extname(path));
      }
      return res.send(files[path]);
    }
    return next();
  };
}

/**
 * This function checks if staticFiles.json exists. This file is created using the pack2json.ts
 * script and contains all static frontend files as base64 encoded values.
 * If staticFiles.json exists it is used to serve the static frontend, otherwise
 * Deno tries to serve the frontend directly from its dist folder.
 *
 * @returns The request handler to serve static files
 */
export async function getStaticFileServer(): Promise<RequestHandler> {
  try {
    const encodedFiles: FileMap = (await import('../dist/staticFiles.json', {
      assert: { type: 'json' },
    })).default;
    const decodedFiles = decodeValues(encodedFiles);
    return getAssetServer(decodedFiles);
  } catch (e) {
    console.log('Serving from path', e);
    const __dirname = dirname(import.meta.url);
    return serveStatic(join(__dirname, '..', '..', 'frontend', 'dist'));
  }
}
