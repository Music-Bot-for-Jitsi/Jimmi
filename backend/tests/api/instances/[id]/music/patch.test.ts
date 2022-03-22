import { superdeno } from 'superdeno/mod.ts';
import app from '../../../../import.app.symlink.ts';
import { createJimmi } from '../../../../../src/service/Jimmi.service.ts';
import Jimmi from '../../../../../src/service/Jimmi.class.ts';

Deno.test('PATCH /api/instances/unknown-id/music that it returns 404!', async () => {
  await superdeno(app)
    .patch('/api/instances/unknown-id/music')
    .expect('Content-Type', /text/)
    .expect(404);
});

Deno.test('PATCH /api/instances/known-id/music/ that it returns 200 for a provided url and 400 if the url is missing', async () => {
  const testJimmi: Jimmi = createJimmi();
  const testUrl = 'testurl.test';
  await superdeno(app)
    .patch('/api/instances/' + testJimmi.id + '/music')
    .send({ 'url': testUrl })
    .expect('Content-Type', /text/)
    .expect(200);
  await superdeno(app)
    .patch('/api/instances/' + testJimmi.id + '/music')
    .expect('Content-Type', /text/)
    .expect(400);
});
