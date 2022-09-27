import { EntityRepository, Repository } from 'typeorm';
import { Record } from './model/record.entity';

@EntityRepository(Record)
export class RecordRepository extends Repository<Record> {
  async findById(recordId: number) {
    const result = await this.findOne({ id: recordId, isDeleted: false });
    return result;
  }
}