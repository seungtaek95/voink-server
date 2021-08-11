import { inject, injectable } from 'inversify';
import { TYPE } from '../loader/container';
import { CreateRecordDto } from '../model/record/record.dto';
import { RecordRepository } from '../model/record/record.repository';

@injectable()
export class RecordService {
  constructor(
    @inject(TYPE.recordRepository) private recordRepository: RecordRepository
  ) {}

  saveOne(createRecordDto: CreateRecordDto) {
    return this.recordRepository.createAndSave(createRecordDto);
  }
}