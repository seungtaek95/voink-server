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

  async getUploadUrl(userId: string | number, recordGroupId: string | number): Promise<Record<string, string>> {
    const filename = nanoid();
    const filepath = `${userId}/${recordGroupId}/${filename}`;
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
      filename
    };
  }

  async getDownloadUrl(userId: string | number, recordGroupId: string | number, filename: string): Promise<string> {
    const filepath = `${userId}/${recordGroupId}/${filename}`;
    const [url] = await this.recordBucket
      .file(filepath)
      .getSignedUrl({
        version: 'v4',
        action: 'read',
        expires: Date.now() + 10 * 60 * 1000, // 10 minutes
      });
    return url;
  }
}
