import * as typeorm from 'typeorm';
import { mysqlConfig } from '../config';
import { RecordGroup } from '../model/record-group/record-group.entity';
import { User } from '../model/user/user.entity';

export default async function () {
  const connection = await typeorm.createConnection({
    type: 'mysql',
    host: mysqlConfig.host,
    port: mysqlConfig.port,
    username: mysqlConfig.user,
    password: mysqlConfig.password,
    database: mysqlConfig.database,
    legacySpatialSupport: false,
    entities: [
      User,
      RecordGroup,
    ],
    synchronize: true,
  });
  
  console.log('connected to DB');

  return connection;
}
