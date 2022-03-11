import { Router } from 'opine/mod.ts';
import { getHandler } from './get.handler.ts';
import instanceRouter from './[id]/index.ts';

const instancesRouter = Router();
instancesRouter.use('/:id', instanceRouter);
instancesRouter.get('/', getHandler);

export default instancesRouter;
