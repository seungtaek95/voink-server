import { Bucket } from '@google-cloud/storage';
import { inject, injectable } from 'inversify';

@injectable()
class SignedUrlService {
  constructor(
    @inject('RecordBucket') private bucket: Bucket,
  ) {}

  getFiles() {
    return this.bucket.getFiles();
  }
}

export { SignedUrlService };