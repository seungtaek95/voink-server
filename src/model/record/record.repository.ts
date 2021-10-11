import { EntityRepository, Repository } from 'typeorm';
import { Record } from './record.entity';

@EntityRepository(Record)
export class RecordRepository extends Repository<Record> {
  async findById(recordId: number | string) {
    const result = await this.findOne(recordId);
    return result;
  }
}