import { EntityRepository, getConnection, Repository } from 'typeorm';
import { Record } from '../../record/model/record.entity';
import { RecordGroup } from './record-group.entity';

@EntityRepository(RecordGroup)
export class RecordGroupRepository extends Repository<RecordGroup> {
  findById(id: string | number) {
    return this.createQueryBuilder('rg')
      .leftJoinAndMapMany('rg.records', Record, 'record', 'rg.id = record.recordGroupId')
      .where('rg.id = :id', { id })
      .andWhere('rg.isDeleted = :isDeleted', { isDeleted: false })
      .getOne();
  }
    
  findByUserId(userId: string | number) {
    return this.createQueryBuilder('rg')
    .leftJoinAndMapMany('rg.records', Record, 'record', 'rg.id = record.recordGroupId')
    .where('rg.user_id = :userId', { userId })
    .andWhere('rg.isDeleted = :isDeleted', { isDeleted: false })
    .getMany();
  }

  async setToDeleted(id: string | number) {
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const recordGroup = await queryRunner.manager.findOne(RecordGroup, id);
      if (!recordGroup) {
        throw new Error('Record group Not found');
      }
      await queryRunner.manager.update(RecordGroup, id, { isDeleted: true });
      await queryRunner.manager.update(Record, { recordGroup: { id } }, { isDeleted: true });
      await queryRunner.commitTransaction();
      await queryRunner.release();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
  }
}