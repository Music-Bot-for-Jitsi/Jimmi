import { RequestHandler } from 'opine/mod.ts';
import { getJimmiBy } from '../../../../service/Jimmi.service.ts';
import Jimmi from '../../../../service/Jimmi.class.ts';

/**
 * @swagger
 * /instances/{id}/music:
 *   delete:
 *     description: Clear the music playlist
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: UUID of the Jimmi instance
 *     responses:
 *       204:
 *         description: Playlist cleared
 *       404:
 *         description: No instance found under the given id
 */
export const deleteHandler: RequestHandler = (req, res, _next) => {
  const jimmiInstance: Jimmi | undefined = getJimmiBy(req.params.id);
  if (jimmiInstance === undefined) return void res.setStatus(404).send();
  jimmiInstance.clearQueue();
  res.setStatus(204).send();
};
