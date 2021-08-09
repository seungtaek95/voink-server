import { Application } from 'express';
import dbLoader from './database';
import containerLoader from './container';
import expressLoader from './express';

export default async function (app: Application) {
  const mysqlConnection = await dbLoader();
  containerLoader(mysqlConnection);
  expressLoader(app);
}