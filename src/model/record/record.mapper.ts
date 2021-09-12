import { injectable } from 'inversify';
import { parsePointToObject } from '../../utils/geomatric';
import { RecordDto } from './record.dto';
import { Record } from './record.entity';

@injectable()
export class RecordMapper {
  toRecordDto(record: Record, downloadUrl?: string): RecordDto {
    const { point, filepath, ...rest } = record;
    const { latitude, longitude } = parsePointToObject(point);
    if (downloadUrl) {
      return {
        ...rest,
        latitude,
        longitude,
        path: downloadUrl,
      };
    }
    return {
      ...rest,
      latitude,
      longitude
    };
  }
}