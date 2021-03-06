import { superdeno } from 'superdeno/mod.ts';
import app from '../../../../../import.app.symlink.ts';
import { createJimmi } from '../../../../../../src/service/Jimmi.service.ts';
import Jimmi from '../../../../../../src/service/Jimmi.class.ts';
import { Stub, stub } from 'mock/mod.ts';
import { assertSpyCall } from 'mock/mod.ts';
Deno.test('DELETE /api/instances/unknown-id/music/index that it returns 404!', async () => {
  await superdeno(app)
    .delete('/api/instances/unknown-id/music/some-index')
    .expect('Content-Type', /text/)
    .expect(404);
});

Deno.test('DELETE /api/instances/known-id/music/valid-index that it returns 204!', async () => {
  const testJimmi: Jimmi = await createJimmi();

  const removeFromQueue: Stub<Jimmi> = stub(
    testJimmi,
    'removeFromQueue',
    () => {},
  );
  const playNextSong: Stub<Jimmi> = stub(
    testJimmi,
    'playNextSong',
    () => {},
  );

  const _status: Stub<Jimmi> = stub(
    testJimmi,
    'status',
    () => {
      return {
        id: 'test',
        name: 'test',
        isPlaying: 'false',
        conference: 'test',
        currentTrack: 'test',
        queueLength: 2,
      };
    },
  );

  await superdeno(app)
    .delete('/api/instances/' + testJimmi.id + '/music/' + '1')
    .expect(204);
  await superdeno(app)
    .delete('/api/instances/' + testJimmi.id + '/music/' + '0')
    .expect(204);
  assertSpyCall(removeFromQueue, 0);
  assertSpyCall(playNextSong, 0);
});

Deno.test('DELETE /api/instances/known-id/music/invalid-index that it returns 400!', async () => {
  const testJimmi: Jimmi = await createJimmi();
  const _removeFromQueue: Stub<Jimmi> = stub(
    testJimmi,
    'removeFromQueue',
    () => {},
  );

  await superdeno(app)
    .delete('/api/instances/' + testJimmi.id + '/music/' + '-1')
    .expect(400);
  await superdeno(app)
    .delete('/api/instances/' + testJimmi.id + '/music/' + 'abc')
    .expect(400);
  await superdeno(app)
    .delete('/api/instances/' + testJimmi.id + '/music/' + (testJimmi.status.queueLength + 1))
    .expect(400);
});
