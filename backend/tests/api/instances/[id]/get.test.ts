import { superdeno } from 'superdeno/mod.ts';
import { createJimmi } from '../../../../src/service/Jimmi.service.ts';
import app from '../../../import.app.symlink.ts';
import {
  assertEquals,
  assertExists,
  assertInstanceOf,
  assertStringIncludes,
} from 'std/testing/asserts.ts';

Deno.test('GET /api/instances/unknown-id that it returns 404!', async () => {
  await superdeno(app)
    .get('/api/instances/unknown-id')
    .expect('Content-Type', /text/)
    .expect(404);
});

Deno.test('GET /api/instances/id that it returns the id of the created instance', async () => {
  const jimmi = await createJimmi();
  const res = await superdeno(app).get(`/api/instances/${jimmi.id}`);

  assertEquals(res.statusCode, 200);
  assertStringIncludes(res.headers['content-type'] as string, 'json');
  assertInstanceOf(res.body, Object, 'res.body should be object');
  assertExists(res.body.id, 'res.body should include id');
  assertEquals(res.body.id, jimmi.id, 'id should match created jimmi instance');
});
