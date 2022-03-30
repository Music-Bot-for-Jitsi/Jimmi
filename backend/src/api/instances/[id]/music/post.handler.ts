import { RequestHandler } from 'opine/mod.ts';
import { getJimmiBy } from '../../../../service/Jimmi.service.ts';
import Jimmi from '../../../../service/Jimmi.class.ts';
import { Errors } from '../../../../../lib/youtube-audio-url-finder/errors.ts';

/**
 * @swagger
 * /instances/{id}/music:
 *   post:
 *     description: Add a music video url to playlist
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: UUID of the Jimmi instance
 *     parameters:
 *       - in: body
 *         name: url
 *         type: string
 *         required: true
 *         description: The desired new video url
 *     responses:
 *       201:
 *         description: Successfully added url to playlist
 *       400:
 *         description: No url or invalid url provided
 *       404:
 *         description: No instance found under the given id
 *       502:
 *         description: Could not find audio file url for the given video url
 */
export const postHandler: RequestHandler = async (req, res, _next) => {
  const jimmiInstance: Jimmi | undefined = getJimmiBy(req.params.id);
  const body = await req.body;

  if (jimmiInstance === undefined) return void res.setStatus(404).send();

  if (body.url === undefined || !(typeof body.url === 'string')) return void res.setStatus(400).send();

  try {
    const audioFileUrl: string = await jimmiInstance.getAudioFileUrl(
      body.url,
    );
    await jimmiInstance.addToQueue(audioFileUrl);
    res.setStatus(201).json(jimmiInstance.music).send();
  } catch (error) {
    if (error.name == Errors.MALFORMED_YOUTUBE_URL) return void res.setStatus(400).send();
    res.setStatus(502).send();
  }
};
