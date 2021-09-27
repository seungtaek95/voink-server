import { injectable } from 'inversify';
import { serverConfig } from '../../config';
import { parsePointToObject } from '../../utils/geomatric';
import { RecordDto } from './dto/record.dto';
import { Record } from './record.entity';

@injectable()
export class RecordMapper {
  toRecordDto(records: Record): RecordDto {
    const { point, recordPath, ...rest } = records;
    const recordUrl = `${serverConfig.baseUrl}/records/${recordPath}`;
    const { latitude, longitude } = parsePointToObject(point);
    return {
      ...rest,
      recordUrl,
      latitude,
      longitude
    };
  }
}