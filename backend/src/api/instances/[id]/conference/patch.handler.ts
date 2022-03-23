import { RequestHandler } from 'opine/mod.ts';
import { getJimmiBy } from '../../../../service/Jimmi.service.ts';
import Joi from 'joi/?dts';

const reqBodySchema = Joi.object<Record<string, string>>({
  instance: Joi.string().required(),
  room: Joi.string().required(),
});

/**
 * @swagger
 * /instances/{id}/conference:
 *   patch:
 *     description: Update the joined conference of the instance
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: UUID of the Jimmi instance
 *       - in: body
 *         name: instance
 *         type: string
 *         required: true
 *         description: URL of the jitsi instance
 *       - in: body
 *         name: room
 *         type: string
 *         required: true
 *         description: Name of the conference
 *     responses:
 *       200:
 *         description: Conference information updated
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: No instance found under the given id
 */
export const patchHandler: RequestHandler = async (req, res, _next) => {
  const { id } = req.params;
  const jimmi = getJimmiBy(id);
  if (jimmi === undefined) return void res.setStatus(404).send();

  // Validate user input
  const { error, value: body } = reqBodySchema.validate(req.body);
  if (error) return void res.setStatus(400).json(error);

  await jimmi.join(body.instance, body.room);
  res.json(jimmi.conference);
};
