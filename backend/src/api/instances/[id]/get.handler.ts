import { RequestHandler } from 'opine/mod.ts';

/**
 * @swagger
 * /instances/{id}:
 *   get:
 *     description: Get detailed information about an instance
 *     responses:
 *       200:
 *         description: hello world
 */
export const getHandler: RequestHandler = (_req, res, _next) => {
  res.send('I am Jimmi!');
};
