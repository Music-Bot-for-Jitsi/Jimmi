import { superdeno } from 'superdeno/mod.ts';
import app from '../../../../import.app.symlink.ts';
import { createJimmi } from '../../../../../src/service/Jimmi.service.ts';
import Jimmi from '../../../../../src/service/Jimmi.class.ts';
import ErrorGenerator from '../../../../../lib/youtube-audio-url-finder/error-generator.ts';
import { Errors } from '../../../../../lib/youtube-audio-url-finder/errors.ts';
import { Stub, stub } from 'mock/mod.ts';
import { assertSpyCall } from 'mock/mod.ts';

Deno.test('POST /api/instances/unknown-id/music that it returns 404!', async () => {
  await superdeno(app)
    .post('/api/instances/unknown-id/music')
    .expect('Content-Type', /text/)
    .expect(404);
});

Deno.test('POST /api/instances/known-id/music that it returns 201 for a provided valid url and 400 for no url or invalid url type', async () => {
  const testJimmi: Jimmi = await createJimmi();
  const testUrl = 'test.test.test';
  const getAudioFileUrl: Stub<Jimmi> = stub(
    testJimmi,
    'getAudioFileUrl',
    () => {
      return testUrl;
    },
  );
  const addToQueue: Stub<Jimmi> = stub(
    testJimmi,
    'addToQueue',
    () => {},
  );

  await superdeno(app)
    .post('/api/instances/' + testJimmi.id + '/music')
    .send({ 'url': testUrl })
    .expect('Content-Type', /json/)
    .expect(201);

  assertSpyCall(getAudioFileUrl, 0, {
    args: [testUrl],
    self: testJimmi,
    returned: testUrl,
  });

  assertSpyCall(addToQueue, 0, {
    args: [testUrl],
    self: testJimmi,
  });

  await superdeno(app)
    .post('/api/instances/' + testJimmi.id + '/music')
    .send({ 'url': 1 })
    .expect('Content-Type', /json/)
    .expect(400);
});

Deno.test('POST /api/instances/known-id/music that it returns 400 for a malformed url and 502 if no audio file can be found', async () => {
  const testJimmi: Jimmi = await createJimmi();
  const testUrl = 'test.test.test';
  let _getAudioFileUrl: Stub<Jimmi> = stub(
    testJimmi,
    'getAudioFileUrl',
    () => {
      throw new ErrorGenerator().createNamedError(Errors.MALFORMED_YOUTUBE_URL);
    },
  );
  const _addToQueue: Stub<Jimmi> = stub(
    testJimmi,
    'addToQueue',
    () => {},
  );

  await superdeno(app)
    .post('/api/instances/' + testJimmi.id + '/music')
    .send({ 'url': testUrl })
    .expect('Content-Type', /text/)
    .expect(400);

  _getAudioFileUrl = stub(
    testJimmi,
    'getAudioFileUrl',
    () => {
      throw new ErrorGenerator().createNamedError(
        Errors.UNEXPECTED_OR_NO_RESPONSE,
      );
    },
  );

  await superdeno(app)
    .post('/api/instances/' + testJimmi.id + '/music')
    .send({ 'url': testUrl })
    .expect('Content-Type', /text/)
    .expect(502);
});
