import { Router } from 'opine/mod.ts';
import { deleteHandler } from './delete.handler.ts';

const indexRouter = Router({
  mergeParams: true,
});

indexRouter.delete('/', deleteHandler);

export default indexRouter;
