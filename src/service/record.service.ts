import { inject, injectable } from 'inversify';
import { TYPE } from '../loader/container';
import { CreateRecordDto } from '../model/record/dto/create-record.dto';
import { Record } from '../model/record/record.entity';
import { RecordMapper } from '../model/record/record.mapper';
import { RecordRepository } from '../model/record/record.repository';

@injectable()
export class RecordService {
  constructor(
    @inject(TYPE.recordRepository) private recordRepository: RecordRepository,
    private recordMapper: RecordMapper,
  ) {}

  save<T extends CreateRecordDto | CreateRecordDto[]>(userId: number, recordGroupId: number, recordGroupPath: string, createRecordDto: T): T extends CreateRecordDto ? Promise<Record> : Promise<Record[]>
  save(userId: number, recordGroupId: number, recordGroupPath: string, createRecordDtos: CreateRecordDto | CreateRecordDto[]) {
    if (Array.isArray(createRecordDtos)) {
      const records = createRecordDtos.map(createRecordDto => this.recordMapper.toEntity(userId, recordGroupId, recordGroupPath, createRecordDto));
      return this.recordRepository.save(records);
    }
    const record = this.recordMapper.toEntity(userId, recordGroupId, recordGroupPath, createRecordDtos);
    return this.recordRepository.save(record);
  }

  async findById(recordId: number | string) {
    const record = await this.recordRepository.findById(recordId);
    return this.recordMapper.toDto(record);
  }
}