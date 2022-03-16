import { RequestHandler } from 'opine/mod.ts';
import { getJimmiBy } from '../../../service/Jimmi.service.ts';

/**
 * @swagger
 * /instances/{id}:
 *   get:
 *     description: Get detailed information about an instance
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: UUID of the Jimmi instance
 *     responses:
 *       200:
 *         description: Jimmi instance
 *       404:
 *         description: No instance found under the given id
 */
export const getHandler: RequestHandler = (req, res, _next) => {
  const { id } = req.params;
  const jimmi = getJimmiBy(id);
  if (jimmi !== undefined) return void res.json(jimmi);
  res.setStatus(404).send();
};
