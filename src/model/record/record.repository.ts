import { EntityRepository, Repository } from 'typeorm';
import { CreateRecordDto } from './record.dto';
import { Record } from './record.entity';

@EntityRepository(Record)
export class RecordRepository extends Repository<Record> {
  _createEntity(userId: number, recordGroupId: number, createRecordDto: CreateRecordDto) {
    return this.create({
      userId,
      recordGroupId,
      filepath: `/${userId}/${recordGroupId}/${createRecordDto.key}.m4a`,
      title: createRecordDto.title,
      duration: createRecordDto.duration,
      point: `POINT(${createRecordDto.latitude} ${createRecordDto.longitude})`,
    });
  }

  createAndSave(userId: number, recordGroupId: number, createRecordDto: CreateRecordDto | CreateRecordDto[]) {
    if (Array.isArray(createRecordDto)) {
      const records = createRecordDto.map(dto => this._createEntity(userId, recordGroupId, dto));
      return this.save(records);
    }

    const record = this._createEntity(userId, recordGroupId, createRecordDto);
    return this.save(record);
  }

  async findById(recordId: number | string) {
    const result = await this.findOne(recordId);
    return result;
  }
}