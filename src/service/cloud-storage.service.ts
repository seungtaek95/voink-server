import { Readable } from 'stream';
import { Bucket } from '@google-cloud/storage';
import { inject, injectable } from 'inversify';
import { TYPE } from '../loader/container';
import { nanoid } from 'nanoid';

@injectable()
export class CloudStorageService {
  private tempDirName = 'temp';

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

  async getRecordUploadUrls(userId: string | number) {
    const key = nanoid();
    const thumbnailPath = `${userId}/${this.tempDirName}/${key}.jpeg`;
    const recordPath = `${userId}/${this.tempDirName}/${key}.m4a`;

    return {
      key,
      thumbnailUrl: await this.getUploadUrl(thumbnailPath),
      recordUrl: await this.getUploadUrl(recordPath),
    };
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

  async getRecordSize(recordPath: string): Promise<number> {
    const [meta] = await this.recordBucket.file(recordPath).getMetadata();
    return meta.size;
  }

  getRecordStream(recordPath: string, options?: any) {
    return this.recordBucket.file(recordPath).createReadStream(options);
  }

  getTempDirPath(userId: number) {
    return `${userId}/${this.tempDirName}`;
  }

  getRecordGroupPath(userId: number, recordGroupId: number) {
    return `${userId}/${recordGroupId}`;
  }

  moveRecordToGroupDir(userId: number, recordGroupPath: string, key: string) {
    const recordPath = `${this.getTempDirPath(userId)}/${key}.m4a`;
    return this.recordBucket.file(recordPath).move(`${recordGroupPath}/${key}.m4a`);
  }

  deleteRecord(recordPath: string) {
    return this.recordBucket.file(recordPath).delete();
  }

  deleteRecordGroup(recordGroupPath: string) {
    return this.recordBucket.file(recordGroupPath).delete();
  }
}
