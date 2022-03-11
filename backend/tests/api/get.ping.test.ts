import { superdeno } from 'superdeno/mod.ts';
import app from '../import.app.symlink.ts';

Deno.test('GET /api/ping that it returns PONG!', async () => {
  await superdeno(app)
    .get('/api/ping')
    .expect('Content-Type', /^text/)
    .expect('Pong!')
    .expect(200);
});
