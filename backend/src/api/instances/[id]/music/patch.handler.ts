import { RequestHandler } from 'opine/mod.ts';
import { getJimmiBy } from '../../../../service/Jimmi.service.ts';
import Jimmi from '../../../../service/Jimmi.class.ts';
import { Actions } from './actions.ts';
import { Response } from './response.ts';

/**
 * @swagger
 * /instances/{id}/music:
 *   patch:
 *     description: Perform an action on the music stream, e.g. play, pause, stop or change music url
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: UUID of the Jimmi instance
 *      - in: body
 *         name: status
 *         type: string
 *         required: true
 *         description: The desired status change
 *       - in: body
 *         name: current
 *         type: string
 *         required: false
 *         description: The desired new video url
 *     responses:
 *       200:
 *         description: Status and url updated
 *       400:
 *         description: Unknown status change requested or invalid video url type provided, videio url must be string if specified
 *       404:
 *         description: No instance found under the given id
 */
export const patchHandler: RequestHandler = async (req, res, _next) => {
  const jimmiInstance: Jimmi | undefined = getJimmiBy(req.params.id);
  const body = await req.body;

  if (jimmiInstance === undefined) {
    res.setStatus(404).send();
    return;
  }
  if (body.current) {
    console.log(typeof (body.current));
    if (typeof body.current === 'string') {
      jimmiInstance.changeMusicUrl(body.current);
    } else {
      res.setStatus(400).send();
      return;
    }
  }
  const responseJSON: Response = {
    status: '',
    queue: jimmiInstance.getQueue(),
    current: jimmiInstance.getCurrent(),
  };
  switch (body.status) {
    case Actions.PLAY:
      jimmiInstance.play();
      responseJSON.status = jimmiInstance.getStatus();
      res.json(responseJSON);
      res.setStatus(200).send();
      break;
    case Actions.PAUSE:
      jimmiInstance.pause();
      responseJSON.status = jimmiInstance.getStatus();
      res.json(responseJSON);
      res.setStatus(200).send();
      break;
    case Actions.STOP:
      jimmiInstance.stop();
      responseJSON.status = jimmiInstance.getStatus();
      res.json(responseJSON);
      res.setStatus(200).send();
      break;
    default:
      res.setStatus(400).send();
  }
};
