import { RequestHandler } from 'opine/mod.ts';
import { getJimmiBy } from '../../../../service/Jimmi.service.ts';
import Jimmi from '../../../../service/Jimmi.class.ts';

/**
 * @swagger
 * /instances/{id}/music:
 *   get:
 *     description: Get details about the status, current track and playlist
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: UUID of the Jimmi instance
 *     responses:
 *       200:
 *         description: Details about the running music
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: No instance found under the given id
 */
export const getHandler: RequestHandler = (req, res, _next) => {
  const jimmiInstance: Jimmi | undefined = getJimmiBy(req.params.id);
  if (jimmiInstance === undefined) return void res.setStatus(404).send();
  res.setStatus(200).json(jimmiInstance.music).send();
};
