import 'reflect-metadata';
import { Bucket, Storage } from '@google-cloud/storage';
import { gcpConfig, serverConfig } from '../config';
import container from '../utils/container';
import { Connection } from 'typeorm';

export default function (mysqlConnection: Connection) {
  const storage = new Storage({
    projectId: gcpConfig.projectId,
    keyFilename: gcpConfig.gcpKeyFilename,
  });
  const recordBucket = storage.bucket(gcpConfig.recordBucket);

  container.bind<Connection>('mysqlConnection').toConstantValue(mysqlConnection);
  container.bind<Bucket>('RecordBucket').toConstantValue(recordBucket);
  container.bind('jwtSecretKey').toConstantValue(serverConfig.jwtSecretKey);
}
