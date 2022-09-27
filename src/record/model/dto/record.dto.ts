import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class RecordDto {
  @Expose()
  id: number;

  @Expose()
  userId: number;

  @Expose()
  recordGroupId: number;

  @Expose()
  title: string;

  @Expose()
  duration: number;

  @Expose()
  thumbnailUrl: string;

  @Expose()
  recordUrl: string;

  @Expose()
  latitude: number;

  @Expose()
  longitude: number;

  @Expose()
  time: number;
}
