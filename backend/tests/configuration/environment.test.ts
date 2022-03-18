import { assert, assertEquals, assertExists } from 'std/testing/asserts.ts';
import { DotenvConfig } from 'https://deno.land/x/dotenv@v3.2.0/mod.ts';
import { envVarsSchema } from '../../src/configuration/environment.ts';

Deno.test('if config validation works', () => {
  const config: DotenvConfig = {
    PORT: '8000',
    HOSTNAME: 'localhost',
    FRONTEND_DIR: 'frontend',
  };
  const { error, value: envVars } = envVarsSchema.validate(config);
  assert(error === undefined);
  assertExists(envVars);
  assertEquals(envVars.PORT, 8000);
  assertEquals(envVars.HOSTNAME, 'localhost');
  assertEquals(envVars.FRONTEND_DIR, 'frontend');
});
