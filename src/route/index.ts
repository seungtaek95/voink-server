import { Router } from 'express';
import authRouter from './auth.route';

export default function () {
  const router = Router();

  authRouter(router);

  return router;
}