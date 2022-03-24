import { RequestHandler } from 'opine/mod.ts';
import { getJimmiBy } from '../../../../service/Jimmi.service.ts';
import Jimmi from '../../../../service/Jimmi.class.ts';
import { Actions, StatusMessages } from './actions.ts';

/**
 * @swagger
 * /instances/{id}/music:
 *   post:
 *     description: Perform an action on the music stream, e.g. play, pause or stop
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: UUID of the Jimmi instance
 *       - in: body
 *         name: action
 *         type: string
 *         required: true
 *         description: The desired action
 *     responses:
 *       200:
 *         description: Action performed
 *       400:
 *         description: Unknown action
 *       404:
 *         description: No instance found under the given id
 */
export const postHandler: RequestHandler = async (req, res, _next) => {
  const jimmiInstance: Jimmi | undefined = getJimmiBy(req.params.id);
  const body = await req.body;
  if (jimmiInstance === undefined) {
    res.setStatus(404).send();
    return;
  }
  switch (body.action) {
    case Actions.PLAY:
      jimmiInstance.play();
      res.setStatus(200).send({ 'status': StatusMessages.PLAY });
      break;
    case Actions.PAUSE:
      jimmiInstance.pause();
      res.setStatus(200).send({ 'status': StatusMessages.PAUSE });
      break;
    case Actions.STOP:
      jimmiInstance.stop();
      res.setStatus(200).send({ 'status': StatusMessages.STOP });
      break;
    default:
      res.setStatus(400).send();
  }
};
