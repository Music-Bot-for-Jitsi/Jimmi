import { Router } from 'opine/mod.ts';
import { getHandler } from './get.handler.ts';
import { patchHandler } from './patch.handler.ts';

const musicRouter = Router({
  mergeParams: true,
});

musicRouter.get('/', getHandler);
musicRouter.patch('/', patchHandler);

export default musicRouter;
