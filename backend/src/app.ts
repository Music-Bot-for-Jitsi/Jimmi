import { dirname, join } from 'std/path/mod.ts';
import { opine, serveStatic } from 'opine/mod.ts';

const app = opine();

const __dirname = dirname(import.meta.url);
app.use(serveStatic(join(__dirname, 'frontend')));

/**
 * @swagger
 * /:
 *   get:
 *     description: Returns the homepage
 *     responses:
 *       200:
 *         description: hello world
 */
app.get('/hello', async (req, res) => {
  res.send('Hello World');
});

const port = 8000;

app.listen(
  port,
  () => console.log(`server has started on http://localhost:${port} 🚀`),
);
