import { RequestHandler } from 'opine/mod.ts';
import { getJimmiBy } from '../../../../service/Jimmi.service.ts';
import Jimmi from '../../../../service/Jimmi.class.ts';

/**
 * @swagger
 * /instances/{id}/music/:
 *   patch:
 *     description: Changes the music stream to music from a provided video url
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: UUID of the Jimmi instance
 *       - in: body
 *         name: url
 *         type: string
 *         required: true
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
  if (body.url === undefined) {
    res.setStatus(400).send();
    return;
  }
  jimmiInstance.changeMusicUrl(body.url);
  res.setStatus(200).send();
};
