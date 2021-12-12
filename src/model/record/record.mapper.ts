import { plainToClass } from 'class-transformer';
import { injectable } from 'inversify';
import { serverConfig } from '../../config';
import { parsePointToObject } from '../../utils/geomatric';
import { RecordDto } from './dto/record.dto';
import { Record } from './record.entity';

@injectable()
export class RecordMapper {
  toDto(record: Record): RecordDto {
    const recordDto = plainToClass(RecordDto, record);
    const thumbnailUrl = `${serverConfig.baseUrl}/records/${record.thumbnailPath}`;
    const recordUrl = `${serverConfig.baseUrl}/records/${record.recordPath}`;
    const { latitude, longitude } = parsePointToObject(record.point);
    recordDto.latitude = latitude;
    recordDto.longitude = longitude;
    recordDto.thumbnailUrl = thumbnailUrl;
    recordDto.recordUrl = recordUrl;
    recordDto.time = record.createdAt.getTime();
    return recordDto;
  }
}