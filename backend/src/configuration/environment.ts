import { config as dotenvConfig } from 'dotenv/mod.ts';
import Joi from 'joi/?dts';

const env = dotenvConfig();

type EnvVars = { [key: string]: string | number | boolean };

// Define validation for all env vars
export const envVarsSchema = Joi.object<EnvVars>({
  PORT: Joi.number().port()
    .default(8000)
    .description('External application port'),
  HOSTNAME: Joi.string()
    .default('localhost')
    .description('External hostname / bind address'),
  FRONTEND_DIR: Joi.string()
    .default('frontend')
    .description('The frontend folder'),
  BROWSER_NO_SANDBOX: Joi.boolean()
    .default(false)
    .description('Disable sandbox mode for browser'),
  BROWSER_WS_ENDPOINT: Joi.string()
    .description('Disable sandbox mode for browser'),
  // 1/2 Add new config pairs here
}).required();

const { error, value: envVars } = envVarsSchema.validate(env);
if (error) throw new Error(`Config validation error: ${error?.message}`);
if (!envVars) throw new Error('Config parsing error!');

const config = {
  port: envVars.PORT as number,
  hostname: envVars.HOSTNAME as string,
  frontendDir: envVars.FRONTEND_DIR as string,
  browser: {
    noSandbox: envVars.BROWSER_NO_SANDBOX as boolean,
    wsEndpoint: envVars.BROWSER_WS_ENDPOINT as string,
  },
  // 2/2 Add new config pairs here
};

export default config;
