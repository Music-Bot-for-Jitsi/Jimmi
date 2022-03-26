import { RequestHandler } from 'opine/mod.ts';
import { getJimmiBy } from '../../../../service/Jimmi.service.ts';
import Jimmi from '../../../../service/Jimmi.class.ts';
import { Response } from './response.ts';

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
 *         description: No url provided
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
  const responseJSON: Response = {
    status: '',
    queue: jimmiInstance.getQueue(),
    current: jimmiInstance.getCurrent(),
  };
  if (body.url === undefined) {
    res.setStatus(400).send();
    return;
  }
  jimmiInstance.addToPlaylist(body.url);
  responseJSON.status = jimmiInstance.getStatus();
  res.json(responseJSON);
  res.setStatus(201).send();
};
