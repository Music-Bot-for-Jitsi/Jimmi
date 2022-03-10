import { RequestHandler } from 'opine/mod.ts';

/**
 * @swagger
 * /ping:
 *   get:
 *     description: Get a heartbeat
 *     responses:
 *       200:
 *         description: pong!
 */
export const getHandler: RequestHandler = (_req, res, _next) => {
  res.send('Pong!');
};
