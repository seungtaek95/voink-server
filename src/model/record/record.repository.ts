import { EntityRepository, Repository } from 'typeorm';
import { CreateRecordDto } from './dto/create-record.dto';
import { Record } from './record.entity';

@EntityRepository(Record)
export class RecordRepository extends Repository<Record> {
  _createEntity(userId: number, recordGroupId: number, recordGroupPath: string, createRecordDto: CreateRecordDto) {
    return this.create({
      userId,
      recordGroupId,
      recordPath: `${recordGroupPath}/${createRecordDto.key}.m4a`,
      title: createRecordDto.title,
      duration: createRecordDto.duration,
      point: `POINT(${createRecordDto.latitude} ${createRecordDto.longitude})`,
    });
  }

  createAndSave<T extends CreateRecordDto | CreateRecordDto[]>(userId: number, recordGroupId: number, recordGroupPath: string, createRecordDto: T): T extends CreateRecordDto ? Promise<Record> : Promise<Record[]>
  createAndSave(userId: number, recordGroupId: number, recordGroupPath: string, createRecordDto: CreateRecordDto | CreateRecordDto[]) {
    if (Array.isArray(createRecordDto)) {
      const records = createRecordDto.map(dto => this._createEntity(userId, recordGroupId, recordGroupPath, dto));
      return this.save(records);
    }

    const record = this._createEntity(userId, recordGroupId, recordGroupPath, createRecordDto);
    return this.save(record);
  }

  async findById(recordId: number | string) {
    const result = await this.findOne(recordId);
    return result;
  }
}