import { config as dotenvConfig } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

const envVars = dotenvConfig(
  {
    path: ".env",
    safe: true,
    example: ".env.example",
    defaults: ".env.defaults",
  },
);

const config = {
  port: parseInt(envVars.PORT),
};

export default config;
