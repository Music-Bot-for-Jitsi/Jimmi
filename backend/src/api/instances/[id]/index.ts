import { Router } from 'opine/mod.ts';
import { getHandler } from './get.handler.ts';
import musicRouter from './music/index.ts';

const instanceRouter = Router({
  mergeParams: true,
});

instanceRouter.use('/music', musicRouter);
instanceRouter.get('/', getHandler);

export default instanceRouter;
