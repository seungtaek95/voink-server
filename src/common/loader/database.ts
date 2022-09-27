import * as typeorm from 'typeorm';
import { RecordGroup } from '../../record-group/model/record-group.entity';
import { Record } from '../../record/model/record.entity';
import { User } from '../../user/model/user.entity';
import { mysqlConfig } from '../config';

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
      Record,
    ],
    synchronize: true,
  });
  
  console.log('connected to DB');

  return connection;
}
