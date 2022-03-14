import { RequestHandler } from 'opine/mod.ts';
import { getJimmiBy } from '../../../service/Jimmi.service.ts';

/**
 * @swagger
 * /instances/{id}:
 *   get:
 *     description: Get detailed information about an instance
 *     responses:
 *       200:
 *         description: hello world
 */
export const getHandler: RequestHandler = (req, res, _next) => {
  const id = req.params.id;
  res.json(getJimmiBy(id));
};
