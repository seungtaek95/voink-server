import * as path from 'path';
import * as typeorm from 'typeorm';
import { mysqlConfig } from '../config';

export default async function () {
  const connection = await typeorm.createConnection({
    type: 'mysql',
    host: mysqlConfig.host,
    port: mysqlConfig.port,
    username: mysqlConfig.user,
    password: mysqlConfig.password,
    database: mysqlConfig.database,
    entities: [
      path.join(__dirname, '../model/user/user.entity.ts'),
    ],
    synchronize: true,
  });
  
  console.log('connected to DB');

  return connection;
}
