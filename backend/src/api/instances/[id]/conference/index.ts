import { Router } from 'opine/mod.ts';
import { getHandler } from './get.handler.ts';
import { patchHandler } from './patch.handler.ts';

const conferenceRouter = Router({
  mergeParams: true,
});

conferenceRouter.get('/', getHandler);
conferenceRouter.patch('/', patchHandler);

export default conferenceRouter;
