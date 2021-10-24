import { Readable } from 'stream';
import { Bucket } from '@google-cloud/storage';
import { inject, injectable } from 'inversify';
import { TYPE } from '../loader/container';
import { nanoid } from 'nanoid';
import { RecordUploadUrlDto } from '../model/record/dto/record-upload-urls.dto';

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

  getRecordUploadUrls(userId: string | number, count: number) {
    const getUploadUrlPromises = new Array(count);
    for (let i = 0; i < count; i++) {
      getUploadUrlPromises[i] = this.getRecordUploadUrl(userId);
    }
    return Promise.all(getUploadUrlPromises);
  }

  private async getRecordUploadUrl(userId: string | number) {
    const key = nanoid();
    const thumbnailPath = `${userId}/${this.tempDirName}/${key}.jpg`;
    const recordPath = `${userId}/${this.tempDirName}/${key}.m4a`;
    
    const recordUploadUrlDto = new RecordUploadUrlDto();
    recordUploadUrlDto.key = key;
    recordUploadUrlDto.thumbnailUrl = await this.getUploadUrl(thumbnailPath);
    recordUploadUrlDto.recordUrl = await this.getUploadUrl(recordPath);

    return recordUploadUrlDto;
  }

  private async getUploadUrl(filepath: string): Promise<string> {
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
    const thumbnailPath = `${this.getTempDirPath(userId)}/${key}.jpg`;
    const recordPath = `${this.getTempDirPath(userId)}/${key}.m4a`;
    return Promise.all([
      this.recordBucket.file(thumbnailPath).move(`${userId}/${recordGroupPath}/${key}.jpg`),
      this.recordBucket.file(recordPath).move(`${userId}/${recordGroupPath}/${key}.m4a`),
    ]);
  }

  deleteRecord(recordPath: string) {
    return this.recordBucket.file(recordPath).delete();
  }

  deleteRecordGroup(recordGroupPath: string) {
    return this.recordBucket.file(recordGroupPath).delete();
  }
}
