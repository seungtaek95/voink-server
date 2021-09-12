import { injectable } from 'inversify';
import { parsePointToObject } from '../../utils/geomatric';
import { RecordDto } from './dto/record.dto';
import { Record } from './record.entity';

@injectable()
export class RecordMapper {
  toRecordDto<T extends Record | Record[]>(record: T): T extends Record ? RecordDto : RecordDto[];
  toRecordDto(records: Record | Record[]) {
    if (Array.isArray(records)) {
      return  records.map(record => {
        const { point, recordPath, ...rest } = record;
        const { latitude, longitude } = parsePointToObject(point);
        return {
          ...rest,
          recordUrl: recordPath,
          latitude,
          longitude
        };
      });
    }

    const { point, recordPath, ...rest } = records;
    const { latitude, longitude } = parsePointToObject(point);
    return {
      ...rest,
      recordUrl: recordPath,
      latitude,
      longitude
    };
  }
}