import { injectable } from 'inversify';
import { parsePointToObject } from '../../utils/geomatric';
import { RecordDto } from './record.dto';
import { Record } from './record.entity';

@injectable()
export class RecordMapper {
  toRecordDto(record: Record): RecordDto {
    const { point, ...rest } = record;
    const { latitude, longitude } = parsePointToObject(point);
    return {
      ...rest,
      latitude,
      longitude
    };
  }
}