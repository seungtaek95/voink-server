import { Application, json } from 'express';
import * as cors from 'cors';
import * as helmet from 'helmet';

export default function (app: Application) {
  app.use(cors());
  app.use(helmet());
  app.use(json());
}