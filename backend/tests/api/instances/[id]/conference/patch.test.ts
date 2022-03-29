import { superdeno } from 'superdeno/mod.ts';
import { createJimmi } from '../../../../../src/service/Jimmi.service.ts';
import app from '../../../../import.app.symlink.ts';
import {
  assertEquals,
  assertStringIncludes,
} from 'std/testing/asserts.ts';

Deno.test('PATCH /api/instances/{id}/conference that it returns valid JSON!', async () => {
  const jimmi = await createJimmi();
  const body = {
    instance: "meet.jit.si",
    room: "myTestRoom"
  }

  const res = await superdeno(app).patch(`/api/instances/${jimmi.id}/conference`).send(body);
  
  assertEquals(res.statusCode, 200);
  assertStringIncludes(res.headers['content-type'] as string, 'json');
  assertEquals(res.body, {name: jimmi.conference.name, ...body})
});


Deno.test('PATCH /api/instances/unknown-id/conference that it returns 404!', async () => {  
  await superdeno(app)
    .patch('/api/instances/unknown-id/conference').send({})
    .expect('Content-Type', /text/)
    .expect(404);
});
