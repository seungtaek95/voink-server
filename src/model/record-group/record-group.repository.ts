import { EntityRepository, Repository } from 'typeorm';
import { Record } from '../record/record.entity';
import { CreateRecordGroupDto } from './dto/create-record-group.dto';
import { RecordGroup } from './record-group.entity';

@EntityRepository(RecordGroup)
export class RecordGroupRepository extends Repository<RecordGroup> {
  createAndSave(userId: number, createRecordGroupDto: CreateRecordGroupDto) {
    const recordGroup = this.create({
      userId,
      category: createRecordGroupDto.category,
      title: createRecordGroupDto.title,
      content: createRecordGroupDto.content,
      location: createRecordGroupDto.location,
      recordType: createRecordGroupDto.recordType,
      point: `POINT(${createRecordGroupDto.latitude} ${createRecordGroupDto.longitude}`,
    });

    return this.save(recordGroup);
  }

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