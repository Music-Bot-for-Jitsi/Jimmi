import { Router } from 'opine/mod.ts';
import { getHandler } from './get.handler.ts';
import musicRouter from './music/index.ts';

const router = Router();
router.use('/music', musicRouter);
router.get('/', getHandler);

export default router;
