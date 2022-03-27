import Jimmi from './Jimmi.class.ts';
import config from '../configuration/environment.ts';
import puppeteer, { Browser } from 'https://deno.land/x/puppeteer@9.0.2/mod.ts';

const instances: Record<string, Jimmi> = {};
const args = [
  '--use-fake-ui-for-media-stream', // disable asking for webcam & video
  '--use-fake-device-for-media-stream', // use fake microphone
  '--disable-web-security', // enable playback of cross origin media/resources
  '--disable-features=IsolateOrigins,site-per-process', // allow to access cross-origin iframe
  // performance related
  '--disable-accelerated-2d-canvas',
  '--single-process',
  '--disable-gpu',
];

let browser: Browser;
try {
  if (config.browser.wsEndpoint !== undefined) {
    console.info('Using chrome on remote endpoint!');
    browser = await puppeteer.connect({
      browserWSEndpoint: config.browser.wsEndpoint,
    });
  } else {
    if (config.browser.noSandbox) {
      args.push('--no-sandbox');
      console.warn('Warning: Browser started with --no-sandbox flag!');
    }

    console.info('Using chrome on local instance');
    browser = await puppeteer.launch({
      executablePath: '/usr/bin/chromium',
      headless: true,
      args,
    });
  }
} catch (error) {
  console.error('Could not create browser!');
  console.error(error);
  Deno.exit(1);
}

/**
 * Creates a new Jimmi instance
 * @returns created Jimmi instance
 */
export async function createJimmi(): Promise<Jimmi> {
  const jimmi = new Jimmi(await browser.newPage());
  instances[jimmi.id] = jimmi;
  await jimmi.init();
  return jimmi;
}

/**
 * Returns the list of ids of available Jimmi instances
 * @returns list of ids
 */
export function getAllJimmiIds(): string[] {
  return Object.keys(instances);
}

/**
 * Returns the Jimmi instance with the given id
 * @param id - id of the Jimmi instance
 * @returns Jimmi instance
 */
export function getJimmiBy(id: string): Jimmi | undefined {
  return instances[id];
}
