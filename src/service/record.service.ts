import { inject, injectable } from 'inversify';
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
  
  async saveOne(userId: number | string, createRecordDto: CreateRecordDto) {
    const record = await this.recordRepository.createAndSave(createRecordDto);
    const recordFilepath = `${userId}/${record.recordGroupId}/${record.id}.m4a`;
    const signedUrl = await this.cloudStorageService.getUploadUrl(recordFilepath);
    return {
      record,
      signedUrl,
    };
  }

  findById(recordId: number | string) {
    return this.recordRepository.findById(recordId);
  }

  async deleteOne(record: Record) {
    await this.recordRepository.delete(record.id);
    return this.cloudStorageService.deleteRecord(record.filepath);
  }
}