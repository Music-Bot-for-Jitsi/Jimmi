import { opine, serveStatic } from 'opine/mod.ts';
import apiRouter from './api/index.ts';

const app = opine();

app.use(serveStatic('frontend'));

app.use('/api', apiRouter);

// Catch-All 404
app.use((_req, res, _next) => res.setStatus(404).send());

const port = 8000;

app.listen(
  port,
  () => console.log(`server has started on http://localhost:${port} 🚀`),
);

export default app;
