import * as mysql from 'mysql2/promise';
import { mysqlConfig } from '../config';

export default async function () {
  const connection = await mysql.createConnection({
    host: mysqlConfig.host,
    user: mysqlConfig.user,
    password: mysqlConfig.password,
    database: mysqlConfig.database,
  });
  
  console.log('connected to DB');

  return connection;
}
