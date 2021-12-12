import { plainToClass } from 'class-transformer';
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

  toDto(recordGroup: RecordGroup): RecordGroupDto {
    const recordGroupDto = plainToClass(RecordGroupDto, recordGroup, { exposeUnsetFields: false });
    const { latitude, longitude } = parsePointToObject(recordGroup.point);
    recordGroupDto.latitude = latitude;
    recordGroupDto.longitude = longitude;
    recordGroupDto.time = recordGroup.createdAt.getTime();
    if (recordGroup.records) {
      recordGroupDto.records = recordGroup.records.map(record => this.recordMapper.toDto(record));
    }
    return recordGroupDto;
  }
}