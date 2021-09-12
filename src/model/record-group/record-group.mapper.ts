import { injectable } from 'inversify';
import { parsePointToObject } from '../../utils/geomatric';
import { RecordGroupDto } from './record-group.dto';
import { RecordGroup } from './record-group.entity';

@injectable()
export class RecordGroupMapper {
  toRecordGroupDto<T extends RecordGroup | RecordGroup[]>(recordGroup: T): T extends RecordGroup ? RecordGroupDto : RecordGroupDto[];
  toRecordGroupDto(recordGroup: RecordGroup | RecordGroup[]) {
    if (Array.isArray(recordGroup)) {
      return recordGroup.map(group => {
        const { point, ...rest } = group;
        const { latitude, longitude } = parsePointToObject(point);
        return {
          ...rest,
          latitude,
          longitude,
        };
      });
    }
    const { point, ...rest } = recordGroup;
    const { latitude, longitude } = parsePointToObject(point);
    return {
      ...rest,
      latitude,
      longitude,
    };
  }
}