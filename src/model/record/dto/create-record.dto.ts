import { IsNumber, IsString } from 'class-validator';
import { parseLocationToPoint } from '../../../utils/geomatric';
import { Record } from '../record.entity';

export class CreateRecordDto {
  @IsString()
  key: string;
  
  @IsString()
  title: string;

  @IsNumber()
  duration: number;

  @IsNumber()
  latitude: number;
  
  @IsNumber()
  longitude: number;

  toEntity(userId: number, recordGroupId: number) {
    const record = new Record();
    record.userId = userId;
    record.recordGroupId = recordGroupId;
    record.thumbnailPath = `${userId}/${recordGroupId}/${this.key}.jpg`;
    record.recordPath = `${userId}/${recordGroupId}/${this.key}.m4a`;
    record.title = this.title;
    record.duration = this.duration;
    record.point = parseLocationToPoint(this.latitude, this.longitude);
    return record;
  }
}
