import { Readable } from 'stream';
import { Bucket } from '@google-cloud/storage';
import { inject, injectable } from 'inversify';
import { TYPE } from '../loader/container';
import { nanoid } from 'nanoid';

@injectable()
export class CloudStorageService {
  tempDirName = 'temp';

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

  async getUploadUrl(userId: number) {
    const key = nanoid();
    const filepath = `/${userId}/${this.tempDirName}/${key}.m4a`;
    const [url] = await this.recordBucket
      .file(filepath)
      .getSignedUrl({
        version: 'v4',
        action: 'write',
        expires: Date.now() + 10 * 60 * 1000, // 10 minutes
        contentType: 'application/octet-stream',
      });
    return {
      url,
      key
    };
  }

  async getDownloadUrl(filepath: string): Promise<string> {
    const [url] = await this.recordBucket
      .file(filepath)
      .getSignedUrl({
        version: 'v4',
        action: 'read',
        expires: Date.now() + 10 * 60 * 1000, // 10 minutes
      });
    return url;
  }

  deleteRecord(recordPath: string) {
    return this.recordBucket.file(recordPath).delete();
  }

  deleteRecordGroup(recordGroupPath: string) {
    return this.recordBucket.file(recordGroupPath).delete();
  }
}
