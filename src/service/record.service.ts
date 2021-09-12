import { inject, injectable } from 'inversify';
import { nanoid } from 'nanoid';
import { TYPE } from '../loader/container';
import { CreateRecordDto } from '../model/record/dto/create-record.dto';
import { Record } from '../model/record/record.entity';
import { RecordMapper } from '../model/record/record.mapper';
import { RecordRepository } from '../model/record/record.repository';
import { CloudStorageService } from './cloud-storage.service';

@injectable()
export class RecordService {
  constructor(
    @inject(TYPE.recordRepository) private recordRepository: RecordRepository,
    private cloudStorageService: CloudStorageService,
    private recordMapper: RecordMapper,
  ) {}

  save<T extends CreateRecordDto | CreateRecordDto[]>(userId: number, recordGroupId: number, recordGroupPath: string, createRecordDto: T): T extends CreateRecordDto ? Promise<Record> : Promise<Record[]>
  save(userId: number, recordGroupId: number, recordGroupPath: string, createRecordDto: CreateRecordDto | CreateRecordDto[]) {
    return this.recordRepository.createAndSave(userId, recordGroupId, recordGroupPath, createRecordDto);
  }

  async findById(recordId: number | string) {
    const record = await this.recordRepository.findById(recordId);
    return this.recordMapper.toRecordDto(record);
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