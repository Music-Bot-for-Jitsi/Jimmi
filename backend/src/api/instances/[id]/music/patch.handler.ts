import { RequestHandler } from 'opine/mod.ts';
import { getJimmiBy } from '../../../../service/Jimmi.service.ts';
import Jimmi from '../../../../service/Jimmi.class.ts';
import { Actions } from './actions.ts';
import { Errors } from '../../../../../lib/youtube-audio-url-finder/errors.ts';
import Joi from 'joi/?dts';

const reqBodySchema = Joi.object<Record<string, string>>({
  status: Joi.string().required(),
  current: Joi.alternatives().conditional('status', {
    is: Actions.PLAY,
    then: Joi.string(),
    otherwise: Joi.forbidden(),
  }),
});

/**
 * @swagger
 * /instances/{id}/music:
 *   patch:
 *     description: Perform a status change on the music stream (playing, paused, stopped) and optionally change music url if the new status is "playing"
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: UUID of the Jimmi instance
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 description: The desired status change
 *                 type: string
 *               current:
 *                 description: The desired new video url
 *                 type: string
 *             required:
 *               - status
 *               - current
 *     responses:
 *       200:
 *         description: Status and url updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Unknown status change requested, invalid video url provided or url provided with new status other than "playing"
 *       404:
 *         description: No instance found under the given id
 *       502:
 *         description: Could not find audio file url for the given video url
 */
export const patchHandler: RequestHandler = async (req, res, _next) => {
  const jimmiInstance: Jimmi | undefined = getJimmiBy(req.params.id);

  if (jimmiInstance === undefined) return void res.setStatus(404).send();

  const { error, value: body } = reqBodySchema.validate(req.body);
  if (error) return void res.setStatus(400).json(error);

  switch (body.status) {
    case Actions.PLAY:
      if (body.current) {
        try {
          const audioFileUrl: string = await jimmiInstance.getAudioFileUrl(body.current);
          await jimmiInstance.play(audioFileUrl);
          res.setStatus(200).json(jimmiInstance.music).send();
        } catch (error) {
          if (error.name == Errors.MALFORMED_YOUTUBE_URL) return void res.setStatus(400).send();
          res.setStatus(502).send();
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
