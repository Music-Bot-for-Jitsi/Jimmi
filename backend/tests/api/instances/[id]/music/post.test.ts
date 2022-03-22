import { superdeno } from 'superdeno/mod.ts';
import app from '../../../../import.app.symlink.ts';
import { createJimmi } from '../../../../../src/service/Jimmi.service.ts';
import Jimmi from '../../../../../src/service/Jimmi.class.ts';
import { Actions } from '../../../../../src/api/instances/[id]/music/actions.ts';

Deno.test('POST /api/instances/unknown-id/action that it returns 404!', async () => {
  await superdeno(app)
    .patch('/api/instances/unknown-id')
    .expect('Content-Type', /text/)
    .expect(404);
});

Deno.test('POST /api/instances/known-id/music/action that it returns 200 for actions PLAY, PAUSE and STOP and 400 for an unknown or missing ACTION', async () => {
  const testJimmi: Jimmi = createJimmi();
  await superdeno(app)
    .post('/api/instances/' + testJimmi.id + '/music/' + Actions.PLAY)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200);
  await superdeno(app)
    .post('/api/instances/' + testJimmi.id + '/music/' + Actions.PAUSE)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200);
  await superdeno(app)
    .post('/api/instances/' + testJimmi.id + '/music/' + Actions.STOP)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200);
  await superdeno(app)
    .post('/api/instances/' + testJimmi.id + '/music/unknown')
    .send({ 'action': 'unknown' })
    .expect('Content-Type', /text/)
    .expect(400);
});
