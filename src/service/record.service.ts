import { inject, injectable } from 'inversify';
import { TYPE } from '../loader/container';
import { CreateRecordDto } from '../model/record/dto/create-record.dto';
import { RecordDto } from '../model/record/dto/record.dto';
import { Record } from '../model/record/record.entity';
import { RecordMapper } from '../model/record/record.mapper';
import { RecordRepository } from '../model/record/record.repository';

@injectable()
export class RecordService {
  constructor(
    @inject(TYPE.recordRepository) private recordRepository: RecordRepository,
    private recordMapper: RecordMapper,
  ) {}

  findById(recordId: number) {
    return this.recordRepository.findById(recordId);
  }

  toDto<T extends Record | Record[]>(records: T): T extends Record ? RecordDto : RecordDto[];
  toDto(records: Record | Record[]) {
    if (Array.isArray(records)) {
      return records.map(record => this.recordMapper.toDto(record));
    }
    return this.recordMapper.toDto(records);
  }
}