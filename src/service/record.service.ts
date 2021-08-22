import { inject, injectable } from 'inversify';
import { nanoid } from 'nanoid';
import { TYPE } from '../loader/container';
import { CreateRecordDto } from '../model/record/record.dto';
import { Record } from '../model/record/record.entity';
import { RecordRepository } from '../model/record/record.repository';
import { CloudStorageService } from './cloud-storage.service';

@injectable()
export class RecordService {
  constructor(
    @inject(TYPE.recordRepository) private recordRepository: RecordRepository,
    private cloudStorageService: CloudStorageService,
  ) {}
  
  async saveOne(userId: number, createRecordDto: CreateRecordDto) {
    const filepath = this.getFilepath(userId, createRecordDto.recordGroupId);
    const record = await this.recordRepository.createAndSave(userId, filepath, createRecordDto);
    const signedUrl = await this.cloudStorageService.getUploadUrl(filepath);
    return {
      record,
      signedUrl,
    };
  }

  findById(recordId: number | string) {
    return this.recordRepository.findById(recordId);
  }

  async deleteOne(userId: number | string, record: Record) {
    await this.recordRepository.delete(record.id);
    const recordFilepath = `${userId}/${record.recordGroupId}/${record.id}.m4a`;
    return this.cloudStorageService.deleteRecord(recordFilepath);
  }

  getFilepath(userId: number, recordGroupId: number) {
    return `${userId}/${recordGroupId}/${nanoid()}.m4a`;
  }
}