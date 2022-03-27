import { Router } from 'opine/mod.ts';
import { getHandler } from './get.handler.ts';
import { patchHandler } from './patch.handler.ts';
import { deleteHandler } from './delete.handler.ts';
import indexRouter from './[index]/index.ts';

const musicRouter = Router({
  mergeParams: true,
});

musicRouter.get('/', getHandler);
musicRouter.patch('/', patchHandler);
musicRouter.delete('/', deleteHandler);
musicRouter.use('/:index', indexRouter);

export default musicRouter;
