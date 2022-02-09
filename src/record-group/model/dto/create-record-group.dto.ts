import { Exclude, Expose, Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { PostRecordGroupRecordDto } from '../../../record/model/dto/post-record-group-record.dto';
import { Record } from '../../../record/model/record.entity';
import { RecordGroup } from '../record-group.entity';

@Exclude()
export class CreateRecordGroupDto {
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

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type (() => PostRecordGroupRecordDto)
  records?: PostRecordGroupRecordDto[];

  toRecordGroup() {
    return RecordGroup.from(
      this.userId,
      this.category,
      this.title,
      this.content,
      this.location,
      this.latitude,
      this.longitude,
      this.recordType,
    );
  }

  toRecords(recordGroupId: number) {
    return this.records?.map(
      record => Record.from(
        this.userId,
        recordGroupId,
        record.title,
        record.duration,
        record.latitude,
        record.longitude,
        record.key,
      )
    );
  }
}
