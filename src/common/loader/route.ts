import { Request, Response, Router } from 'express';
import authRouter from '../../auth/auth.route';
import recordGroupRouter from '../../record-group/record-group.route';
import recordRouter from '../../record/record.route';
import userRouter from '../../user/user.route';

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