import { Router } from 'opine/mod.ts';
import { getHandler } from './get.handler.ts';

const router = Router();

router.get('/', getHandler);

export default router;
