import { RequestHandler } from 'opine/mod.ts';
import { getJimmiBy } from '../../../../service/Jimmi.service.ts';
import Jimmi from '../../../../service/Jimmi.class.ts';
import { Actions, StatusMessages } from './actions.ts';

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
 *         name: action
 *         type: string
 *         required: true
 *         description: The desired action
 *       - in: body
 *         name: url
 *         type: string
 *         required: false
 *         description: The desired new video url
 *     responses:
 *       200:
 *         description: New music url set
 *       400:
 *         description: No video url provided
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
    case Actions.SWITCHURL:
      if (body.url === undefined) {
        res.setStatus(400).send({ 'status': StatusMessages.MISSINGURL });
        return;
      }
      jimmiInstance.changeMusicUrl(body.url);
      res.setStatus(200).send({ 'status': StatusMessages.SWITCHMUSICURL });
      break;
    default:
      res.setStatus(400).send({ 'status': StatusMessages.UNKNOWNACTION });
  }
};
