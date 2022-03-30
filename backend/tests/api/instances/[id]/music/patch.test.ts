import { superdeno } from 'superdeno/mod.ts';
import app from '../../../../import.app.symlink.ts';
import { createJimmi } from '../../../../../src/service/Jimmi.service.ts';
import Jimmi from '../../../../../src/service/Jimmi.class.ts';

import { Actions } from '../../../../../src/api/instances/[id]/music/actions.ts';
import { Stub, stub } from 'mock/mod.ts';

Deno.test('PATCH /api/instances/unknown-id/music that it returns 404!', async () => {
  await superdeno(app)
    .patch('/api/instances/unknown-id/music')
    .expect('Content-Type', /text/)
    .expect(404);
});

Deno.test('PATCH /api/instances/known-id/music/ with status change to playing and provided current field that it returns 400 for an invalid type or status change other than playing', async () => {
  const testJimmi: Jimmi = await createJimmi();
  const _getAudioFileUrl: Stub<Jimmi> = stub(
    testJimmi,
    'getAudioFileUrl',
    () => {
      return 'test.test.de';
    },
  );

  const _play: Stub<Jimmi> = stub(
    testJimmi,
    'play',
    () => {
    },
  );

  const testUrl = 'test.test.test';

  await superdeno(app)
    .patch('/api/instances/' + testJimmi.id + '/music')
    .send({ 'status': Actions.PLAY, 'current': testUrl })
    .expect('Content-Type', /json/)
    .expect(200);

  await superdeno(app)
    .patch('/api/instances/' + testJimmi.id + '/music')
    .send({ 'status': Actions.PAUSE, 'current': testUrl })
    .expect('Content-Type', /text/)
    .expect(400);

  await superdeno(app)
    .patch('/api/instances/' + testJimmi.id + '/music')
    .send({ 'status': Actions.STOP, 'current': testUrl })
    .expect('Content-Type', /text/)
    .expect(400);

  await superdeno(app)
    .patch('/api/instances/' + testJimmi.id + '/music')
    .send({ 'status': Actions.PLAY, 'current': 1 })
    .expect('Content-Type', /text/)
    .expect(400);
});

Deno.test('PATCH /api/instances/known-id/music/ that it returns 400 if current is specified but no status is specified', async () => {
  const testJimmi: Jimmi = await createJimmi();
  const testUrl = 'test.test.test';
  await superdeno(app)
    .patch('/api/instances/' + testJimmi.id + '/music/')
    .send({ 'current': testUrl })
    .expect('Content-Type', /text/)
    .expect(400);
});

Deno.test('PATCH /api/instances/known-id/music/ that it returns 200 for actions PLAY, PAUSE and STOP and 400 for an unknown or missing status', async () => {
  const testJimmi: Jimmi = await createJimmi();

  const _play: Stub<Jimmi> = stub(
    testJimmi,
    'play',
    () => {},
  );
  const _pause: Stub<Jimmi> = stub(
    testJimmi,
    'pause',
    () => {},
  );
  const _stop: Stub<Jimmi> = stub(
    testJimmi,
    'stop',
    () => {},
  );

  await superdeno(app)
    .patch('/api/instances/' + testJimmi.id + '/music/')
    .send({ 'status': Actions.PLAY })
    .expect('Content-Type', /json/)
    .expect(200);
  await superdeno(app)
    .patch('/api/instances/' + testJimmi.id + '/music/')
    .send({ 'status': Actions.PAUSE })
    .expect('Content-Type', /json/)
    .expect(200);
  await superdeno(app)
    .patch('/api/instances/' + testJimmi.id + '/music/')
    .send({ 'status': Actions.STOP })
    .expect('Content-Type', /json/)
    .expect(200);
  await superdeno(app)
    .patch('/api/instances/' + testJimmi.id + '/music/')
    .send({ 'status': 'unknown' })
    .expect('Content-Type', /text/)
    .expect(400);
  await superdeno(app)
    .patch('/api/instances/' + testJimmi.id + '/music/')
    .expect('Content-Type', /text/)
    .expect(400);
});
