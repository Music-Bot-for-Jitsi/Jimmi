import { opine, serveStatic } from 'opine/mod.ts';
import apiRouter from './api/index.ts';
import config from './configuration/environment.ts'

const app = opine();

app.use(serveStatic('frontend'));

app.use('/api', apiRouter);

// Catch-all 404
app.use((_req, res, _next) => res.setStatus(404).send());

app.listen(
  config.port,
  () => console.log(`server has started on http://localhost:${config.port} 🚀`),
);

export default app;
