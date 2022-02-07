import { Exclude, Expose } from 'class-transformer';
import { RecordDto } from '../../../record/model/dto/record.dto';

@Exclude()
export class RecordGroupDto {
  @Expose()
  id: number;

  @Expose()
  userId: number;

  @Expose()
  category: string;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  location: string;

  @Expose()
  recordType: string;

  @Expose()
  latitude: number;
  
  @Expose()
  longitude: number;
  
  @Expose()
  time: Number;

  @Expose()
  records?: RecordDto[]
}