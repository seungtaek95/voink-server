import { injectable } from 'inversify';
import { parsePointToObject } from '../../utils/geomatric';
import { RecordDto } from '../record/dto/record.dto';
import { RecordGroupDto } from './dto/record-group.dto';
import { RecordGroup } from './record-group.entity';

@injectable()
export class RecordGroupMapper {
  toRecordGroupDto(recordGroup: RecordGroup, recordDtos: RecordDto[]): RecordGroupDto {
    const { point, ...rest } = recordGroup;
    const { latitude, longitude } = parsePointToObject(point);
    return {
      ...rest,
      latitude,
      longitude,
      records: recordDtos
    };
  }
}