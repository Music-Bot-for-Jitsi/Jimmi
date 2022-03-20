import { RequestHandler } from 'opine/mod.ts';
import { getJimmiBy } from '../../../../service/Jimmi.service.ts';
import Jimmi from '../../../../service/Jimmi.class.ts';

/**
 * @swagger
 * /instances/{id}/music:
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
 */
export const postHandler: RequestHandler = (req, res, _next) => {
  const jimmiInstance: Jimmi | undefined = getJimmiBy(req.params.id);
  if (jimmiInstance === undefined) {
    res.setStatus(404).send('Instance not found');
    return;
  }
  if (req.body.url === undefined) {
    res.setStatus(400).send('No video url provided');
    return;
  }
  jimmiInstance.changeMusicUrl(req.body.url);
  res.setStatus(200).send('Changed music url');
};
