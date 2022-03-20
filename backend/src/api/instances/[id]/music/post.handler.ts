import { RequestHandler } from 'opine/mod.ts';
import { getJimmiBy } from '../../../../service/Jimmi.service.ts';
import Jimmi from '../../../../service/Jimmi.class.ts';
import { ActionMessages, Actions } from './actions.ts';

/**
 * @swagger
 * /instances/{id}/music/{action}:
 *   post:
 *     description: Perform an action on the music stream, e.g. play, pause or stop
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: UUID of the Jimmi instance
 *       - in: path
 *         name: action
 *         type: string
 *         required: true
 *         description: The desired action
 *     responses:
 *       200:
 *         description: Action performed
 */
export const postHandler: RequestHandler = (req, res, _next) => {
  const jimmiInstance: Jimmi | undefined = getJimmiBy(req.params.id);
  if (jimmiInstance === undefined) {
    res.setStatus(404).send('Instance not found');
    return;
  }
  switch (req.params.action) {
    case Actions.PLAY:
      jimmiInstance.play();
      res.setStatus(200).send(ActionMessages.PLAY);
      break;
    case Actions.PAUSE:
      jimmiInstance.pause;
      res.setStatus(200).send(ActionMessages.PAUSE);
      break;
    case Actions.STOP:
      jimmiInstance.stop();
      res.setStatus(200).send(ActionMessages.STOP);
      break;
    default:
      res.setStatus(400).send(ActionMessages.UNKNOWN);
  }
};
