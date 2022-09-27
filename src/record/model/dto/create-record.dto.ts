import { Exclude, Expose } from 'class-transformer';
import { Record } from '../record.entity';

@Exclude()
export class CreateRecordDto {
  @Expose()
  userId: number;

  @Expose()
  recordGroupId: number;

  @Expose()
  key: string;
  
  @Expose()
  title: string;

  @Expose()
  duration: number;

  @Expose()
  latitude: number;
  
  @Expose()
  longitude: number;

  toEntity() {
    return Record.from(
      this.userId,
      this.recordGroupId,
      this.title,
      this.duration,
      this.latitude,
      this.longitude,
      this.key,
    );
  }
}
