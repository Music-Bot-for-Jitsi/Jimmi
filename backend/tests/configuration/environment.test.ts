import { assert, assertEquals, assertExists, assertThrows } from 'std/testing/asserts.ts';
import { DotenvConfig } from 'dotenv/mod.ts';
import { envVarsSchema } from '../../src/configuration/environment.ts';

const defaultConfig: DotenvConfig = {
  PORT: '8000',
  HOSTNAME: 'localhost',
  FRONTEND_DIR: 'frontend',
};

Deno.test('if config validation works', () => {
  const { error, value: envVars } = envVarsSchema.validate(defaultConfig);
  assert(error === undefined);
  assertExists(envVars);
  assertEquals(envVars.PORT, 8000);
  assertEquals(envVars.HOSTNAME, 'localhost');
  assertEquals(envVars.FRONTEND_DIR, 'frontend');
});

Deno.test('if config validation error works', () => {
  assertThrows(() => {
    const config: DotenvConfig = {
      ...defaultConfig,
      PORT: '90000',
    };
    const { error } = envVarsSchema.validate(config);
    if (error) throw new Error(`Config validation error: ${error?.message}`);
  });
});
