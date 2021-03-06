import { Bucket } from '@google-cloud/storage';
import { inject, injectable } from 'inversify';
import { nanoid } from 'nanoid';
import { TYPE } from '../common/loader/container';
import { RecordUploadUrlDto } from '../record/model/dto/record-upload-urls.dto';
import { Record } from '../record/model/record.entity';

@injectable()
export class CloudStorageService {
  private tempDirName = 'temp';

  constructor(
    @inject(TYPE.recordBucket) private recordBucket: Bucket,
  ) {}

  getRecordUploadUrls(userId: number, count: number) {
    const getUploadUrlPromises = new Array(count);
    for (let i = 0; i < count; i++) {
      getUploadUrlPromises[i] = this.getRecordUploadUrl(userId);
    }
    return Promise.all(getUploadUrlPromises);
  }

  private async getRecordUploadUrl(userId: number) {
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

  async getFileSize(filePath: string): Promise<number> {
    const [meta] = await this.recordBucket.file(filePath).getMetadata();
    return meta.size;
  }

  getFileStream(filePath: string, options?: any) {
    return this.recordBucket.file(filePath).createReadStream(options);
  }

  moveRecordFromTempToGroupDir(record: Record) {
    const tempThumbnailPath = this.getTempThumbnailPath(record);
    const tempRecordPath = this.getTempRecordPath(record);
    return Promise.all([
      this.recordBucket.file(tempThumbnailPath).move(record.thumbnailPath),
      this.recordBucket.file(tempRecordPath).move(record.recordPath),
    ]);
  }

  deleteRecord(recordPath: string) {
    return this.recordBucket.file(recordPath).delete();
  }

  deleteRecordGroup(recordGroupPath: string) {
    return this.recordBucket.file(recordGroupPath).delete();
  }

  private getTempThumbnailPath(record: Record) {
    return `${record.userId}/${this.tempDirName}/${record.key}.jpg`;
  }

  private getTempRecordPath(record: Record) {
    return `${record.userId}/${this.tempDirName}/${record.key}.m4a`;
  }
}
