import { Bucket } from '@google-cloud/storage';
import { inject, injectable } from 'inversify';
import { Readable } from 'stream';
import { TYPE } from '../constant/type';

@injectable()
export class CloudStorageService {
  constructor(
    @inject(TYPE.recordBucket) private recordBucket: Bucket,
    @inject(TYPE.profileBucket) private profileBucket: Bucket,
  ) {}

  uploadUserPicture(source: Readable, userId: number, size: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const dest = this.profileBucket.file(`${userId}/${size}.jpeg`).createWriteStream();
      source.pipe(dest)
        .on('finish', resolve)
        .on('error', reject);
    });
  }
}
