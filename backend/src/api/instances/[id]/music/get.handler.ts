import { RequestHandler } from 'opine/mod.ts';
import { getJimmiBy } from '../../../../service/Jimmi.service.ts';
import Jimmi from '../../../../service/Jimmi.class.ts';

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
 *         description: UUID of the Jimmi instance
 *     responses:
 *       200:
 *         description: Let\'s rock\'n roll!
 */
export const getHandler: RequestHandler = (req, res, _next) => {
  const jimmiInstance: Jimmi | undefined = getJimmiBy(req.params.id);
  if (jimmiInstance === undefined) {
    res.setStatus(404).send('Instance not found');
    return;
  }
  res.json(jimmiInstance.getMusicInfo());
  res.setStatus(200).send();
};
