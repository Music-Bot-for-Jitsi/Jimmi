import { superdeno } from 'superdeno/mod.ts';
import app from '../../../../import.app.symlink.ts';
import { createJimmi } from '../../../../../src/service/Jimmi.service.ts';
import Jimmi from '../../../../../src/service/Jimmi.class.ts';

Deno.test('GET /api/instances/unknown-id/music that it returns 404!', async () => {
  await superdeno(app)
    .get('/api/instances/unknown-id/music')
    .expect('Content-Type', /text/)
    .expect(404);
});

Deno.test('GET /api/instances/known-id/music that it returns 200!', async () => {
  const testJimmi: Jimmi = await createJimmi();
  await superdeno(app)
    .get('/api/instances/' + testJimmi.id + '/music')
    .expect('Content-Type', /json/)
    .expect(200);
});
