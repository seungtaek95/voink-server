import { plainToClass } from 'class-transformer';
import { injectable } from 'inversify';
import { parseLocationToPoint, parsePointToObject } from '../../utils/geomatric';
import { RecordMapper } from '../record/record.mapper';
import { CreateRecordGroupDto } from './dto/create-record-group.dto';
import { RecordGroupDto } from './dto/record-group.dto';
import { RecordGroup } from './record-group.entity';

@injectable()
export class RecordGroupMapper {
  constructor(
    private recordMapper: RecordMapper,
  ) {}

  toEntity(createRecordGroupDto: CreateRecordGroupDto) {
    const recordGroup = new RecordGroup();
    recordGroup.userId = createRecordGroupDto.userId;
    recordGroup.category = createRecordGroupDto.category;
    recordGroup.recordType = createRecordGroupDto.recordType;
    recordGroup.title = createRecordGroupDto.title;
    recordGroup.content = createRecordGroupDto.content;
    recordGroup.location = createRecordGroupDto.location;
    recordGroup.point = parseLocationToPoint(createRecordGroupDto.latitude, createRecordGroupDto.longitude);
    return recordGroup;
  }

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