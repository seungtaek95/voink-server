import { EntityRepository, Repository } from 'typeorm';
import { Record } from './record.entity';

@EntityRepository(Record)
export class RecordGroupRepository extends Repository<Record> {
  
}