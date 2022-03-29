import { superdeno } from 'superdeno/mod.ts';
import { createJimmi } from '../../../../src/service/Jimmi.service.ts';
import app from '../../../import.app.symlink.ts';
<<<<<<< HEAD
import {
  assertEquals,
  assertExists,
  assertInstanceOf,
  assertStringIncludes,
} from 'std/testing/asserts.ts';
=======
import { createJimmi } from '../../../../src/service/Jimmi.service.ts';
import Jimmi from '../../../../src/service/Jimmi.class.ts';
>>>>>>> 96606c444d28aaadea5ca5cfe36f576290fc1177

Deno.test('GET /api/instances/unknown-id that it returns 404!', async () => {
  await superdeno(app)
    .get('/api/instances/unknown-id')
    .expect('Content-Type', /text/)
    .expect(404);
});

<<<<<<< HEAD
Deno.test('GET /api/instances/id that it returns the id of the created instance', async () => {
  const jimmi = await createJimmi();
  const res = await superdeno(app).get(`/api/instances/${jimmi.id}`);

  assertEquals(res.statusCode, 200);
  assertStringIncludes(res.headers['content-type'] as string, 'json');
  assertInstanceOf(res.body, Object, 'res.body should be object');
  assertExists(res.body.id, 'res.body should include id');
  assertEquals(res.body.id, jimmi.id, 'id should match created jimmi instance');
=======
Deno.test('GET /api/instances/known-id that it returns 200!', async () => {
  const testJimmi: Jimmi = await createJimmi();
  await superdeno(app)
    .get('/api/instances/' + testJimmi.id)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200);
>>>>>>> 96606c444d28aaadea5ca5cfe36f576290fc1177
});
