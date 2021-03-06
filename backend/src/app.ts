import { HTTPOptions, json, opine, serveStatic } from 'opine/mod.ts';
import apiRouter from './api/index.ts';
import config from './configuration/environment.ts';

const app = opine();
app.use(json());

app.use(serveStatic(config.frontendDir));

app.use(json());

app.use('/api', apiRouter);

// Catch-all 404
app.use((_req, res, _next) => res.setStatus(404).send());

const options: HTTPOptions = {
  port: config.port,
  hostname: config.hostname,
};

app.listen(
  options,
  () => console.log(`Server has started on http://${config.hostname}:${config.port}`),
);

export default app;
