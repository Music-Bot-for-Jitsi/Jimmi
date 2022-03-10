import instancesRouter from './instances/index.ts';
import { getHandler as pingGetHandler } from './ping.get.handler.ts';
import { Router } from 'opine/mod.ts';

const router = Router();
router.get('/ping', pingGetHandler);
router.use('/instances', instancesRouter);

export default router;
