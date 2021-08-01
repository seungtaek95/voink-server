import 'reflect-metadata';
import { Bucket, Storage } from '@google-cloud/storage';
import { gcpConfig, serverConfig } from '../config';
import container from '../utils/container';
import { Connection } from 'typeorm';
import { TYPE } from '../constant/type';
import { UserRepository } from '../model/user/user.repository';
import axios, { AxiosInstance } from 'axios';

export default function (mysqlConnection: Connection) {
  const storage = new Storage({
    projectId: gcpConfig.projectId,
    keyFilename: gcpConfig.gcpKeyFilename,
  });
  const recordBucket = storage.bucket(gcpConfig.recordBucket);
  const userRepository = mysqlConnection.getCustomRepository(UserRepository);
  const fbRequest = axios.create({
    baseURL: 'https://graph.facebook.com/me',
  });

  container.bind<Connection>(TYPE.mysqlConnection).toConstantValue(mysqlConnection);
  container.bind<UserRepository>(TYPE.userRepository).toConstantValue(userRepository);
  container.bind<Bucket>(TYPE.recordBucket).toConstantValue(recordBucket);
  container.bind<string>(TYPE.jwtSecretKey).toConstantValue(serverConfig.jwtSecretKey);
  container.bind<AxiosInstance>(TYPE.fbRequest).toConstantValue(fbRequest);
}
