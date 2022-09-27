import { inject, injectable } from 'inversify';
import { TYPE } from '../common/loader/container';
import { HttpError } from '../common/utils/util';
import { RecordMapper } from './model/record.mapper';
import { RecordRepository } from './record.repository';

@injectable()
export class RecordService {
  constructor(
    @inject(TYPE.recordRepository) private recordRepository: RecordRepository,
    private recordMapper: RecordMapper,
  ) {}

  async findById(recordId: number, userId: number) {
    const record = await this.recordRepository.findById(recordId);
    if (!record  || record.userId !== userId) {
      throw new HttpError('Not found', 404);
    }
    return this.recordMapper.toDto(record);
  }
}