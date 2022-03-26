import { RequestHandler } from 'opine/mod.ts';
import { getAllJimmiIds } from '../../service/Jimmi.service.ts';

/**
 * @swagger
 * /instances:
 *   get:
 *     description: Returns a list of available Jimmi instances
 *     responses:
 *       200:
 *         description: Array of UUIDs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
export const getHandler: RequestHandler = (_req, res, _next) => {
  res.json(getAllJimmiIds());
};
