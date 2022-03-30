import { superdeno } from 'superdeno/mod.ts';
import app from '../../../../import.app.symlink.ts';
import { createJimmi } from '../../../../../src/service/Jimmi.service.ts';
import Jimmi from '../../../../../src/service/Jimmi.class.ts';
import { Stub, stub } from 'mock/mod.ts';
import { assertSpyCall } from 'mock/mod.ts';

Deno.test('DELETE /api/instances/unknown-id/music that it returns 404!', async () => {
  await superdeno(app)
    .delete('/api/instances/unknown-id/music')
    .expect('Content-Type', /text/)
    .expect(404);
});

Deno.test('DELETE /api/instances/known-id/music that it returns 204 and clears the queue', async () => {
  const testJimmi: Jimmi = await createJimmi();
  const testUrl = 'test.test.test';
  const clearQueue: Stub<Jimmi> = stub(
    testJimmi,
    'clearQueue',
    () => {},
  );

  await superdeno(app)
    .delete('/api/instances/' + testJimmi.id + '/music')
    .send({ 'url': testUrl })
    .expect(204);
  assertSpyCall(clearQueue, 0, {
    args: [],
    self: testJimmi,
  });
});
