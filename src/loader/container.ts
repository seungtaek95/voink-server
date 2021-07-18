import 'reflect-metadata';
import { Bucket, Storage } from '@google-cloud/storage';
import { gcpConfig } from '../config';
import container from '../utils/container';

const storage = new Storage({
  projectId: gcpConfig.projectId,
  keyFilename: gcpConfig.gcpKeyFilename,
});

const recordBucket = storage.bucket(gcpConfig.recordBucket);

container.bind<Bucket>('RecordBucket').toConstantValue(recordBucket);

export default container;