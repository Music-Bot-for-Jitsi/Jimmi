import { opine, serveStatic } from 'opine/mod.ts';

const app = opine();

app.use(serveStatic('frontend'));

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
