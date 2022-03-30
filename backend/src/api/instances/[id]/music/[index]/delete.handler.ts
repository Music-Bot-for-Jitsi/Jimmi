import { RequestHandler } from 'opine/mod.ts';
import { getJimmiBy } from '../../../../../service/Jimmi.service.ts';
import Jimmi from '../../../../../service/Jimmi.class.ts';

/**
 * @swagger
 * /instances/{id}/music/{index}:
 *   delete:
 *     description: Removes a track from the queue or skip the current track
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: UUID of the Jimmi instance
 *      - in: path
 *         name: index
 *         type: int
 *         required: true
 *         description: Track position in queue (starting with 1, submitting index 0 skips the current track)
 *     responses:
 *       204:
 *         description: Track removed or skipped
 *       400:
 *         description: Invalid index, either not a number, negative or higher than queue length
 *       404:
 *         description: No instance found under the given id
 */
export const deleteHandler: RequestHandler = (req, res, _next) => {
  const jimmiInstance: Jimmi | undefined = getJimmiBy(req.params.id);
  const index: string = req.params.index;
  if (jimmiInstance === undefined) {
    res.setStatus(404).send();
    return;
  }
  const indexNumber: number = parseInt(index);
  if (indexNumber === 0) {
    jimmiInstance.playNextSong();
    res.setStatus(204).send();
    return;
  }
  if (indexNumber < 0 || isNaN(indexNumber)) {
    res.setStatus(400).send();
    return;
  }
  if (indexNumber > jimmiInstance.status.queueLength) {
    res.setStatus(400).send();
    return;
  }

  jimmiInstance.removeFromQueue(indexNumber - 1);
  res.setStatus(204).send();
};
