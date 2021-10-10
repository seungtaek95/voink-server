import { Router } from 'express';
import authRouter from './auth.route';
import recordGroupRouter from './record-group.route';
import recordRouter from './record.route';
import userRouter from './user.route';

export default function () {
  const router = Router();

  authRouter(router);
  recordGroupRouter(router);
  recordRouter(router);
  userRouter(router);

  return router;
}