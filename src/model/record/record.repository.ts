import { EntityRepository, Repository } from 'typeorm';
import { CreateRecordDto } from './record.dto';
import { Record } from './record.entity';

@EntityRepository(Record)
export class RecordRepository extends Repository<Record> {
  createAndSave(createRecordDto: CreateRecordDto) {
    const record = this.create();
    record.recordGroupId = createRecordDto.recordGroupId;
    record.title = createRecordDto.title;
    record.duration = createRecordDto.duration;
    record.point = `POINT(${createRecordDto.latitude} ${createRecordDto.longitude})`;

    return this.save(record);
  }
}