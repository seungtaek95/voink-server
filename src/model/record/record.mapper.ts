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

  toDto(record: Record): RecordDto {
    const recordDto = new RecordDto();    
    const thumbnailUrl = `${serverConfig.baseUrl}/records/${record.thumbnailPath}`;
    const recordUrl = `${serverConfig.baseUrl}/records/${record.recordPath}`;
    const { latitude, longitude } = parsePointToObject(record.point);
    recordDto.id = record.id;
    recordDto.userId = record.userId;
    recordDto.title = record.title;
    recordDto.latitude = latitude;
    recordDto.longitude = longitude;
    recordDto.thumbnailUrl = thumbnailUrl;
    recordDto.recordUrl = recordUrl;
    recordDto.duration = record.duration;
    recordDto.recordGroupId = record.recordGroupId;
    recordDto.time = record.createdAt.getTime();
    return recordDto;
  }
}