import { RequestHandler } from 'opine/mod.ts';
import { getJimmiBy } from '../../../../service/Jimmi.service.ts';

/**
 * @swagger
 * /instances/{id}/conference:
 *   get:
 *     description: Get detailed information about the conference the bot joined
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: UUID of the Jimmi instance
 *     responses:
 *       200:
 *         description: Conference information
 *       404:
 *         description: No instance found under the given id
 */
export const getHandler: RequestHandler = (req, res, _next) => {
  const { id } = req.params;
  const jimmi = getJimmiBy(id);
  if (jimmi === undefined) return void res.setStatus(404).send();
  res.json(jimmi.conference);
};
