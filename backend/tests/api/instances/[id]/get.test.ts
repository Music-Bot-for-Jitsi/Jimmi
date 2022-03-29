import { superdeno } from 'superdeno/mod.ts';
import { createJimmi } from '../../../../src/service/Jimmi.service.ts';
import app from '../../../import.app.symlink.ts';

Deno.test('GET /api/instances/unknown-id that it returns 404!', async () => {
  await superdeno(app)
    .get('/api/instances/unknown-id')
    .expect('Content-Type', /text/)
    .expect(404);
});

Deno.test('GET /api/instances/id that it returns the id of the created instance', async () => {
  const jimmi = await createJimmi();
  await superdeno(app)
    .post(`/api/instances/${jimmi.id}`)
    .expect('Content-Type', /json/)
    .expect(200)
    .then((res) => {
      if (!(Object.keys(res.body).includes('id'))) throw new Error('res.body should include id');
      if (res.body.id !== jimmi.id) throw new Error('id should match created jimmi instance');
    });
});
