import { superdeno } from 'superdeno/mod.ts';
import { createJimmi, getJimmiBy } from '../../../../../src/service/Jimmi.service.ts';
import app from '../../../../import.app.symlink.ts';
import {
assert,
  assertEquals,
  assertExists,
  assertInstanceOf,
  assertStringIncludes,
} from 'std/testing/asserts.ts';

Deno.test('GET /api/instances/{id}/conference that it returns valid JSON!', async () => {
  const jimmi = await createJimmi();
  assert(getJimmiBy(jimmi.id) === jimmi)
  const res = await superdeno(app).get(`/api/instances/${jimmi.id}/conference`);
  
  assertEquals(res.statusCode, 200);
  assertStringIncludes(res.headers['content-type'] as string, 'json');
  assertInstanceOf(res.body, Object, 'res.body should be object');
  assertExists(res.body.name, 'res.body should include name');
});


Deno.test('GET /api/instances/unknown-id/conference that it returns 404!', async () => {  
  await superdeno(app)
    .get('/api/instances/unknown-id/conference')
    .expect('Content-Type', /text/)
    .expect(404);
});
