import { Router } from 'opine/mod.ts';
import conferenceRouter from './conference/index.ts';
import { getHandler } from './get.handler.ts';
import musicRouter from './music/index.ts';

const instanceRouter = Router({
  mergeParams: true,
});

instanceRouter.use('/music', musicRouter);
instanceRouter.use('/conference', conferenceRouter);
instanceRouter.get('/', getHandler);

export default instanceRouter;
