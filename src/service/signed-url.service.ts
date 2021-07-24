import { Bucket } from '@google-cloud/storage';
import { inject, injectable } from 'inversify';
import { TYPE } from '../constant/type';

@injectable()
class SignedUrlService {
  constructor(
    @inject(TYPE.recordBucket) private bucket: Bucket,
  ) {}

  getFiles() {
    return this.bucket.getFiles();
  }
}

export { SignedUrlService };