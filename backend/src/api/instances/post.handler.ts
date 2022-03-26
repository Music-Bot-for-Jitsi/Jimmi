import { RequestHandler } from 'opine/mod.ts';
import { createJimmi } from '../../service/Jimmi.service.ts';

/**
 * @swagger
 * /instances:
 *   post:
 *     description: Create a new Jimmi instance
 *     responses:
 *       200:
 *         description: Details about the created Jimmi instance
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The instance ID.
 */
export const postHandler: RequestHandler = async (_req, res, _next) => {
  const jimmi = await createJimmi();
  res.json(jimmi.status);
};
