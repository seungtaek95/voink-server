import { injectable } from 'inversify';
import { parsePointToObject } from '../../utils/geomatric';
import { RecordMapper } from '../record/record.mapper';
import { RecordGroupDto } from './dto/record-group.dto';
import { RecordGroup } from './record-group.entity';

@injectable()
export class RecordGroupMapper {
  constructor(
    private recordMapper: RecordMapper,
  ) {}

  toRecordGroupDto(recordGroup: RecordGroup): RecordGroupDto {
    const { records, point, ...rest } = recordGroup;
    const recordDtos = records.map(record => this.recordMapper.toRecordDto(record));
    const { latitude, longitude } = parsePointToObject(point);
    return {
      ...rest,
      latitude,
      longitude,
      records: recordDtos
    };
  }
}