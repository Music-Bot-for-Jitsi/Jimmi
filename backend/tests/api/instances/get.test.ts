import { superdeno } from 'superdeno/mod.ts';
import app from '../../import.app.symlink.ts';

Deno.test('GET /api/instances that it returns valid JSON!', async () => {
  await superdeno(app)
    .get('/api/instances')
    .expect('Content-Type', /json/)
    .expect(200)
    .then(res => {
      if (!(res.body instanceof Array)) throw new Error("res.body should be array");
    })
});
