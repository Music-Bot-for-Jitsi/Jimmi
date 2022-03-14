import { RequestHandler } from 'opine/mod.ts';

/**
 * @swagger
 * /instances/{id}/music:
 *   get:
 *     description: Get details about the running music
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: UUID of Jimmi instance
 *     responses:
 *       200:
 *         description: Let\'s rock\'n roll!
 */
export const getHandler: RequestHandler = (_req, res, _next) => {
  res.send('Let\'s rock\'n roll!');
};
