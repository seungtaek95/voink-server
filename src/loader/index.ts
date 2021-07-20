import { Application } from 'express';
import mysqlLoader from './mysql';
import containerLoader from './container';
import expressLoader from './express';

export default async function (app: Application) {
  const mysqlConnection = await mysqlLoader();
  containerLoader(mysqlConnection);
  expressLoader(app);
}