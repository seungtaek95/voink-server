import 'reflect-metadata';
import { Bucket, Storage } from '@google-cloud/storage';
import { gcpConfig, serverConfig } from '../config';
import container from '../utils/container';
import { Connection } from 'typeorm';
import { UserRepository } from '../model/user/user.repository';
import axios, { AxiosInstance } from 'axios';
import { RecordGroupRepository } from '../model/record-group/record-group.repository';
import { RecordRepository } from '../model/record/record.repository';

export default function (mysqlConnection: Connection) {
  const storage = new Storage({
    projectId: gcpConfig.projectId,
    keyFilename: gcpConfig.gcpKeyFilename,
  });
  const recordBucket = storage.bucket(gcpConfig.recordBucket);
  const profileBucket = storage.bucket(gcpConfig.profileBucket);
  const userRepository = mysqlConnection.getCustomRepository(UserRepository);
  const recordGroupRepository = mysqlConnection.getCustomRepository(RecordGroupRepository);
  const recordRepository = mysqlConnection.getCustomRepository(RecordRepository);
  const fbRequest = axios.create({
    baseURL: 'https://graph.facebook.com/me',
  });

  container.bind<Connection>(TYPE.mysqlConnection).toConstantValue(mysqlConnection);
  container.bind<UserRepository>(TYPE.userRepository).toConstantValue(userRepository);
  container.bind<RecordGroupRepository>(TYPE.recordGroupRepository).toConstantValue(recordGroupRepository);
  container.bind<RecordRepository>(TYPE.recordRepository).toConstantValue(recordRepository);
  container.bind<Bucket>(TYPE.recordBucket).toConstantValue(recordBucket);
  container.bind<Bucket>(TYPE.profileBucket).toConstantValue(profileBucket);
  container.bind<string>(TYPE.jwtSecretKey).toConstantValue(serverConfig.jwtSecretKey);
  container.bind<AxiosInstance>(TYPE.fbRequest).toConstantValue(fbRequest);
}

export const TYPE = {
  jwtSecretKey: 'JSON_SECRET_KEY',
  recordBucket: 'RECORD_BUCKET',
  profileBucket: 'PROFILE_BUCKET',
  mysqlConnection: 'MYSQL_CONNECTION',
  userRepository: 'USER_REPOSITORY',
  recordGroupRepository: 'RECORD_GROUP_REPOSITORY',
  recordRepository: 'RECORD_REPOSITORY',
  fbRequest: 'FACEBOOK_REQUEST',
};