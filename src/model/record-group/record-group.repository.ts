import { EntityRepository, Repository } from 'typeorm';
import { CreateRecordGroupDto } from './record-group.dto';
import { RecordGroup } from './record-group.entity';

@EntityRepository(RecordGroup)
export class RecordGroupRepository extends Repository<RecordGroup> {
  createAndSave(createRecordGroupDto: CreateRecordGroupDto) {
    const recordGroup = this.create();
    recordGroup.user = createRecordGroupDto.userId;
    recordGroup.category = createRecordGroupDto.category;
    recordGroup.title = createRecordGroupDto.title;
    recordGroup.location = createRecordGroupDto.location;
    recordGroup.recordType = createRecordGroupDto.recordType;
    recordGroup.point = `POINT(${createRecordGroupDto.latitude} ${createRecordGroupDto.longitude})`;

    return this.save(recordGroup);
  }

  findById(id: string | number) {
    return this.createQueryBuilder('record_group')
      .leftJoinAndSelect('record_group.user', 'user')
      .where('record_group.id = :id', { id })
      .getOne();
  }

  findByUser(userId: string | number) {
    return this.createQueryBuilder('record_group')
      .leftJoinAndSelect('record_group.user', 'user')
      .where('record_group.user_id = :userId', { userId })
      .getMany();
  }
}