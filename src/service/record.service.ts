import { inject, injectable } from 'inversify';
import { TYPE } from '../loader/container';
import { CreateRecordDto } from '../model/record/dto/create-record.dto';
import { RecordDto } from '../model/record/dto/record.dto';
import { Record } from '../model/record/record.entity';
import { RecordMapper } from '../model/record/record.mapper';
import { RecordRepository } from '../model/record/record.repository';
import { CloudStorageService } from './cloud-storage.service';

@injectable()
export class RecordService {
  constructor(
    @inject(TYPE.recordRepository) private recordRepository: RecordRepository,
    private recordMapper: RecordMapper,
    private cloudStorageService: CloudStorageService,
  ) {}

  save<T extends CreateRecordDto | CreateRecordDto[]>(userId: number, recordGroupId: number, recordGroupPath: string, createRecordDto: T): T extends CreateRecordDto ? Promise<Record> : Promise<Record[]>
  save(userId: number, recordGroupId: number, recordGroupPath: string, createRecordDtos: CreateRecordDto | CreateRecordDto[]) {
    return this.recordRepository.createAndSave(userId, recordGroupId, recordGroupPath, createRecordDtos);
  }

  async findById(recordId: number | string) {
    const record = await this.recordRepository.findById(recordId);
    return this.mapToDto(record);
  }

  mapToDto<T extends Record | Record[]>(record: T): T extends Record ? RecordDto : RecordDto[];
  mapToDto(records: Record | Record[]) {
    if (Array.isArray(records)) {
      return records.map(record => this.recordMapper.toRecordDto(record));
    }
    return this.recordMapper.toRecordDto(records);
  }

  getRecordSize(recordPath: string) {
    return this.cloudStorageService.getRecordSize(recordPath);
  }

  getRecordStream(recordPath: string, options?: any) {
    return this.cloudStorageService.getRecordStream(recordPath, options);
  }
}