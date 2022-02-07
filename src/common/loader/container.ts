import 'reflect-metadata';
import { Bucket, Storage } from '@google-cloud/storage';
import { Connection } from 'typeorm';
import axios, { AxiosInstance } from 'axios';
import { gcpConfig, serverConfig } from '../config';
import container from '../utils/container';
import { UserRepository } from '../../user/model/user.repository';
import { RecordGroupRepository } from '../../record-group/model/record-group.repository';
import { RecordRepository } from '../../record/model/record.repository';

export default function (connection: Connection) {
  const storage = new Storage({
    projectId: gcpConfig.projectId,
    keyFilename: gcpConfig.gcpKeyFilename,
  });
  const recordBucket = storage.bucket(gcpConfig.recordBucket);
  const profileBucket = storage.bucket(gcpConfig.profileBucket);
  const userRepository = connection.getCustomRepository(UserRepository);
  const recordGroupRepository = connection.getCustomRepository(RecordGroupRepository);
  const recordRepository = connection.getCustomRepository(RecordRepository);
  const fbRequest = axios.create({
    baseURL: 'https://graph.facebook.com/me',
  });

  container.bind<Connection>(TYPE.connection).toConstantValue(connection);
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
  connection: 'MYSQL_CONNECTION',
  userRepository: 'USER_REPOSITORY',
  recordGroupRepository: 'RECORD_GROUP_REPOSITORY',
  recordRepository: 'RECORD_REPOSITORY',
  fbRequest: 'FACEBOOK_REQUEST',
};