import { EntityRepository, Repository } from 'typeorm';
import { RecordGroup } from './record-group.entity';

@EntityRepository(RecordGroup)
export class RecordGroupRepository extends Repository<RecordGroup> {

}