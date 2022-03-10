import { RequestHandler } from 'opine/mod.ts';

/**
 * @swagger
 * /instances:
 *   get:
 *     description: Get all instances of Jimmi
 *     responses:
 *       200:
 *         description: hello world
 */
export const getHandler: RequestHandler = (_req, res, _next) => {
  res.send('Knock Knock - Who is there?');
};
