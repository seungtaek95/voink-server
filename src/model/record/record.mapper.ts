import { plainToClass } from 'class-transformer';
import { injectable } from 'inversify';
import { serverConfig } from '../../config';
import { parseLocationToPoint, parsePointToObject } from '../../utils/geomatric';
import { CreateRecordDto } from './dto/create-record.dto';
import { RecordDto } from './dto/record.dto';
import { Record } from './record.entity';

@injectable()
export class RecordMapper {
  toEntity(userId: number, recordGroupId: number, recordGroupPath: string, createRecordDto: CreateRecordDto) {
    const record = new Record();
    record.userId = userId;
    record.recordGroupId = recordGroupId;
    record.thumbnailPath = `${recordGroupPath}/${createRecordDto.key}.jpg`;
    record.recordPath = `${recordGroupPath}/${createRecordDto.key}.m4a`;
    record.title = createRecordDto.title;
    record.duration = createRecordDto.duration;
    record.point = parseLocationToPoint(createRecordDto.latitude, createRecordDto.longitude);
    return record;
  }

  toDto(records: Record): RecordDto {
    const { point, thumbnailPath, recordPath, ...rest } = records;
    const thumbnailUrl = `${serverConfig.baseUrl}/records/${thumbnailPath}`;
    const recordUrl = `${serverConfig.baseUrl}/records/${recordPath}`;
    const { latitude, longitude } = parsePointToObject(point);
    return plainToClass(RecordDto, {
      ...rest,
      thumbnailUrl,
      recordUrl,
      latitude,
      longitude
    });
  }
}