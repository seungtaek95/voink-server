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
  
  saveOne(createRecordDto: CreateRecordDto) {
    return this.recordRepository.createAndSave(createRecordDto);
  }

  findById(recordId: number | string) {
    return this.recordRepository.findById(recordId);
  }

  async deleteOne(record: Record) {
    await this.recordRepository.delete(record.id);
    return this.cloudStorageService.deleteRecord(record.filepath);
  }
}