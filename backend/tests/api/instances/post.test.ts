import { superdeno } from 'superdeno/mod.ts';
import app from '../../import.app.symlink.ts';

Deno.test('POST /api/instances that it returns valid JSON!', async () => {
  await superdeno(app)
    .post('/api/instances')
    .expect('Content-Type', /json/)
    .expect(200)
    .then((res) => {
      if (!(res.body instanceof Object)) throw new Error('res.body should be array');
      if (!(Object.keys(res.body).includes('id'))) throw new Error('res.body should include id');
    });
});
