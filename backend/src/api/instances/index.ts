import { Router } from 'opine/mod.ts';
import { getHandler } from './get.handler.ts';
import instanceRouter from './[id]/index.ts';

const router = Router();
router.get('/', getHandler);
router.use('/:id', instanceRouter);

export default router;
