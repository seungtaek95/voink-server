import { Router } from 'express';
import authRouter from './auth.route';
import recordGroupRouter from './record-group.route';

export default function () {
  const router = Router();

  authRouter(router);
  recordGroupRouter(router);

  return router;
}