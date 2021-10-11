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

  toEntity(userId: number, createRecordGroupDto: CreateRecordGroupDto) {
    const recordGroup = new RecordGroup();
    recordGroup.userId = userId;
    recordGroup.category = createRecordGroupDto.category;
    recordGroup.title = createRecordGroupDto.title;
    recordGroup.content = createRecordGroupDto.content;
    recordGroup.location = createRecordGroupDto.location;
    recordGroup.point = parseLocationToPoint(createRecordGroupDto.latitude, createRecordGroupDto.longitude);
    return recordGroup;
  }

  toDto(recordGroup: RecordGroup): RecordGroupDto {
    const recordGroupDto = new RecordGroupDto();
    const { latitude, longitude } = parsePointToObject(recordGroup.point);
    recordGroupDto.userId = recordGroup.userId;
    recordGroupDto.category = recordGroup.category;
    recordGroupDto.title = recordGroup.title;
    recordGroupDto.content = recordGroup.content;
    recordGroupDto.location = recordGroup.location;
    recordGroupDto.latitude = latitude;
    recordGroupDto.longitude = longitude;
    recordGroupDto.records = recordGroup.records.map(record => this.recordMapper.toDto(record));
    return recordGroupDto;
  }
}