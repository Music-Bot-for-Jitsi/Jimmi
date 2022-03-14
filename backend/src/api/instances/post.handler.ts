import { RequestHandler } from 'opine/mod.ts';
import { createJimmi } from '../../service/Jimmi.service.ts';

/**
 * @swagger
 * /instances:
 *   post:
 *     description: Create a new Jimmi instance
 *     responses:
 *       200:
 *         description: hello world
 */
export const postHandler: RequestHandler = (_req, res, _next) => {
  res.json(createJimmi());
};
