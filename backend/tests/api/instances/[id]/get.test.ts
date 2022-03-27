import { superdeno } from 'superdeno/mod.ts';
import app from '../../../import.app.symlink.ts';

Deno.test('GET /api/instances/unknown-id that it returns 404!', async () => {
  await superdeno(app)
    .get('/api/instances/unknown-id')
    .expect('Content-Type', /text/)
    .expect(404);
});
