import { RequestHandler } from 'opine/mod.ts';
import { createJimmi } from '../../service/Jimmi.service.ts';

/**
 * @swagger
 * /instances:
 *   post:
 *     description: Create a new Jimmi instance
 *     responses:
 *       200:
 *         description: Details about the created Jimmi instance
 */
export const postHandler: RequestHandler = async (_req, res, _next) => {
  res.json(await createJimmi());
};
