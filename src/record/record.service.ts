import { inject, injectable } from 'inversify';
import { TYPE } from '../common/loader/container';
import { RecordDto } from './model/dto/record.dto';
import { Record } from './model/record.entity';
import { RecordMapper } from './model/record.mapper';
import { RecordRepository } from './record.repository';

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