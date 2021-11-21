import { Request, Response, Router } from 'express';
import authRouter from './auth.route';
import recordGroupRouter from './record-group.route';
import recordRouter from './record.route';
import userRouter from './user.route';

export default function () {
  const router = Router();

  router.get('/handshake', (req: Request, res: Response) => {
    return res.status(200).end();
  });

  authRouter(router);
  recordGroupRouter(router);
  recordRouter(router);
  userRouter(router);

  return router;
}