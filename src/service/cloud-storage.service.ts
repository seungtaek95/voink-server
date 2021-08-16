import { Readable } from 'stream';
import { Bucket } from '@google-cloud/storage';
import { inject, injectable } from 'inversify';
import { nanoid } from 'nanoid';
import { TYPE } from '../loader/container';

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

  generateFilename() {
    const uniqueId = nanoid();
    return `${uniqueId}.m4a`;
  }

  async getUploadUrl(filepath: string): Promise<string> {
    const [url] = await this.recordBucket
      .file(filepath)
      .getSignedUrl({
        version: 'v4',
        action: 'write',
        expires: Date.now() + 10 * 60 * 1000, // 10 minutes
        contentType: 'application/octet-stream',
      });
    return url;
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
