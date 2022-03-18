import { assert, assertEquals, assertExists, assertThrows } from 'std/testing/asserts.ts';
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

Deno.test('if config validation error works', () => {
  assertThrows(() => {
    const config: DotenvConfig = {
      PORT: '90000',
      HOSTNAME: 'localhost',
      FRONTEND_DIR: 'frontend',
    };
    const { error } = envVarsSchema.validate(config);
    if (error) throw new Error(`Config validation error: ${error?.message}`);
  })
});
