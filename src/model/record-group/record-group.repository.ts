import { EntityRepository, Repository } from 'typeorm';
import { RecordGroup } from './record-group.entity';

@EntityRepository(RecordGroup)
export class UserRepository extends Repository<RecordGroup> {
  
}