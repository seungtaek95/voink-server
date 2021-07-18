import { Application } from 'express';
import mysqlLoader from './mysql';
import expressLoader from './express';

export default async function (app: Application) {
  await mysqlLoader();
  expressLoader(app);
}