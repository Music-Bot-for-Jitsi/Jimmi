import { superdeno } from 'superdeno/mod.ts';
import {
  assertEquals,
  assertExists,
  assertInstanceOf,
  assertStringIncludes,
} from 'std/testing/asserts.ts';
import app from '../../import.app.symlink.ts';

Deno.test('POST /api/instances that it returns valid JSON!', async () => {
  const res = await superdeno(app).post('/api/instances');
  assertEquals(res.statusCode, 200);
  assertStringIncludes(res.headers['content-type'] as string, 'json');
  assertInstanceOf(res.body, Object, 'res.body should be object');
  assertExists(res.body.id, 'res.body should include id');
});
