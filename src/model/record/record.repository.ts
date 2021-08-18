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
    record.filepath = createRecordDto.filepath;

    return this.save(record);
  }

  async findById(recordId: number | string) {
    const result = await this.findOne(recordId);
    return result;
  }
}