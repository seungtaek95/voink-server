import { EntityRepository, Repository } from 'typeorm';
import { Record } from '../record/record.entity';
import { RecordGroup } from './record-group.entity';

@EntityRepository(RecordGroup)
export class RecordGroupRepository extends Repository<RecordGroup> {
  findById(id: string | number) {
    return this.createQueryBuilder('rg')
      .leftJoinAndMapMany('rg.records', Record, 'record', 'rg.id = record.recordGroupId')
      .where('rg.id = :id', { id })
      .getOne();
    }

  findByUserId(userId: string | number) {
    return this.createQueryBuilder('rg')
      .leftJoinAndMapMany('rg.records', Record, 'record', 'rg.id = record.recordGroupId')
      .where('rg.user_id = :userId', { userId })
      .getMany();
  }
}