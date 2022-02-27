import { opine } from 'opine/mod.ts';
import { swaggerDoc } from 'swagger-doc/mod.ts';

const app = opine();

app.get('/', function (req, res) {
  res.send('Hello World');
});

const swaggerDefinition = {
  info: {
    title: 'Hello World', // Title (required)
    version: '1.0.0', // Version (required)
    description: 'A sample API', // Description (optional)
  },
  host: `localhost:8000`, // Host (optional)
  basePath: '/', // Base path (optional)
};

const options = {
  swaggerDefinition,
  // Path to the API docs (all files with swagger definitions)
  // Note that this path is relative to the current directory from which the Node.js is ran, not the application itself.
  apis: ['./src/app.ts'],
};

const swaggerSpec = swaggerDoc(options);

app.get('/swagger.json', async (req, res) => {
  res.send(swaggerSpec);
});

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
