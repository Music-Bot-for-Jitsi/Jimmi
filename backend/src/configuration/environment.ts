import { config as dotenvConfig } from 'dotenv/mod.ts';
import Joi from 'joi/?dts';

const env = dotenvConfig();

type EnvVars = { [key: string]: string | number | boolean };

// Define validation for all env vars
export const envVarsSchema = Joi.object<EnvVars>({
  PORT: Joi.number().port()
    .default(8000)
    .description('External application port'),
  BOTNAME: Joi.string()
    .default('DJ Jimmi')
    .description('Name used to join jitsi conference'),
  HOSTNAME: Joi.string()
    .default('localhost')
    .description('External hostname / bind address'),
  FRONTEND_DIR: Joi.string()
    .default('frontend')
    .description('The frontend folder'),
  GAIN: Joi.number()
    .min(0)
    .max(100)
    .default(20)
    .description('Default gain'),
  BROWSER_BRIDGE: Joi.string()
    .default('https://bridges.jimmi.xyz/bridge.html')
    .description('Bridge page for browser'),
  BROWSER_NO_SANDBOX: Joi.boolean()
    .default(false)
    .description('Disable sandbox mode for browser'),
  BROWSER_PATH: Joi.string()
    .default('/usr/bin/chromium')
    .description('Path to local chrome/chromium installation'),
  BROWSER_WS_ENDPOINT: Joi.string()
    .description('Remote endpoint for browser'),
  INVIDIOUS_INSTANCELIST_URL: Joi.string()
    .default('https://api.invidious.io/instances.json')
    .description('Url to get Invidious instance urls from'),
  // 1/2 Add new config pairs here
}).required();

const { error, value: envVars } = envVarsSchema.validate(env);
if (error) throw new Error(`Config validation error: ${error?.message}`);
if (!envVars) throw new Error('Config parsing error!');

const config = {
  port: envVars.PORT as number,
  botname: envVars.BOTNAME as string,
  hostname: envVars.HOSTNAME as string,
  frontendDir: envVars.FRONTEND_DIR as string,
  gain: envVars.GAIN as number,
  browser: {
    bridge: envVars.BROWSER_BRIDGE as string,
    noSandbox: envVars.BROWSER_NO_SANDBOX as boolean,
    path: envVars.BROWSER_PATH as string,
    wsEndpoint: envVars.BROWSER_WS_ENDPOINT as string,
  },
  invidiousInstanceListurl: envVars.INVIDIOUS_INSTANCELIST_URL as string,
  // 2/2 Add new config pairs here
};

export default config;
