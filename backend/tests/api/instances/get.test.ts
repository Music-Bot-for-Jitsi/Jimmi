import { superdeno } from 'superdeno/mod.ts';
import app from '../../import.app.symlink.ts';
import { assertEquals, assertInstanceOf, assertStringIncludes } from 'std/testing/asserts.ts';

Deno.test('GET /api/instances that it returns valid JSON!', async () => {
  const res = await superdeno(app).get('/api/instances');

  assertEquals(res.statusCode, 200);
  assertStringIncludes(res.headers['content-type'] as string, 'json');
  assertInstanceOf(res.body, Array, 'res.body should be array');
});
