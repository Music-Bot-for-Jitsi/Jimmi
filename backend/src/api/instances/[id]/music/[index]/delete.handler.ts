import { RequestHandler } from 'opine/mod.ts';
import { getJimmiBy } from '../../../../../service/Jimmi.service.ts';
import Jimmi from '../../../../../service/Jimmi.class.ts';
import Joi from 'joi/?dts';

const indexSchema = Joi.number().min(0);

/**
 * @swagger
 * /instances/{id}/music/{index}:
 *   delete:
 *     description: Remove a track from the queue or skip the current track
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
  if (jimmiInstance === undefined) return void res.setStatus(404).send();

  const { error, value: indexNumber } = indexSchema.validate(req.params.index);
  if (error) return void res.setStatus(400).json(error).send();
  if (indexNumber > jimmiInstance.status.queueLength) return void res.setStatus(400).send();
  if (indexNumber === 0) {
    jimmiInstance.playNextSong();
  } else {
    jimmiInstance.removeFromQueue(indexNumber - 1);
  }
  res.setStatus(204).send();
};
