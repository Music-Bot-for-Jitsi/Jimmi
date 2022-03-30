import { RequestHandler } from 'opine/mod.ts';
import { getJimmiBy } from '../../../../service/Jimmi.service.ts';
import Jimmi from '../../../../service/Jimmi.class.ts';
import { Actions } from './actions.ts';
import { Errors } from '../../../../../lib/youtube-audio-url-finder/errors.ts';

/**
 * @swagger
 * /instances/{id}/music:
 *   patch:
 *     description: Perform a status change on the music stream (playing, paused, stopped) and optionally change music url if the new status is "playing"
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
 *         description: Unknown status change requested, invalid video url provided or url provided with new status other than "playing"
 *       404:
 *         description: No instance found under the given id
 *       502:
 *         description: Could not find audio file url for the given video url
 */
export const patchHandler: RequestHandler = async (req, res, _next) => {
  const jimmiInstance: Jimmi | undefined = getJimmiBy(req.params.id);
  const body = await req.body;

  if (jimmiInstance === undefined) {
    res.setStatus(404).send();
    return;
  }
  if (body.current && !(body.status === Actions.PLAY)) {
    res.setStatus(400).send();
    return;
  }

  switch (body.status) {
    case Actions.PLAY:
      if (body.current) {
        if (typeof body.current === 'string') {
          try {
            const audioFileUrl: string = await jimmiInstance.getAudioFileUrl(body.current);
            await jimmiInstance.play(audioFileUrl);
          } catch (error) {
            if (error.name == Errors.MALFORMED_YOUTUBE_URL) res.setStatus(400).send();
            else {
              res.setStatus(502).send();
            }
          }
        } else {
          res.setStatus(400).send();
        }
      } else {
        await jimmiInstance.play();
        res.setStatus(200).json(jimmiInstance.music).send();
      }
      break;
    case Actions.PAUSE:
      await jimmiInstance.pause();
      res.setStatus(200).json(jimmiInstance.music).send();
      break;
    case Actions.STOP:
      await jimmiInstance.stop();
      res.setStatus(200).json(jimmiInstance.music).send();
      break;
    default:
      res.setStatus(400).send();
  }
};
