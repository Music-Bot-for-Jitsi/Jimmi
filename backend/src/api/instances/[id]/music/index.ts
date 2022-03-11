import { Router } from 'opine/mod.ts';
import { getHandler } from './get.handler.ts';

const musicRouter = Router();

musicRouter.get('/', getHandler);

export default musicRouter;
