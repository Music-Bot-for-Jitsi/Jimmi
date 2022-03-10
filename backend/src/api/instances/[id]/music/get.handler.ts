import { RequestHandler } from 'opine/mod.ts';

/**
 * @swagger
 * /instances/{id}/music:
 *   get:
 *     description: Get details about the running music
 *     responses:
 *       200:
 *         description: hello world
 */
export const getHandler: RequestHandler = (_req, res, _next) => {
  res.send('Let\'s rock\'n roll!');
};
