import { Router } from 'opine/mod.ts';
import { getHandler } from './get.handler.ts';
import { postHandler } from './post.handler.ts';
import instanceRouter from './[id]/index.ts';
import { v4 } from 'std/uuid/mod.ts';
const instancesRouter = Router();

/**
 * Validate the id parameter for all endpoints at /api/instances/[id]/*
 */
instancesRouter.param('id', (req, _res, next, id: string) => {
  if (!v4.validate(id)) return next('route');
  req.params['id'] = id;
  next();
});

instancesRouter.use('/:id', instanceRouter);
instancesRouter.get('/', getHandler);
instancesRouter.post('/', postHandler);

export default instancesRouter;
