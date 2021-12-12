import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { parseLocationToPoint } from '../../../utils/geomatric';
import { CreateRecordDto } from '../../record/dto/create-record.dto';
import { RecordGroup } from '../record-group.entity';

export class CreateRecordGroupDto {
  @IsNumber()
  userId: number;
  
  @IsString()
  category: string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  location: string;

  @IsString()
  recordType: string;

  @IsNumber()
  latitude: number;
  
  @IsNumber()
  longitude: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRecordDto)
  records?: CreateRecordDto[];

  toEntity() {
    const recordGroup = new RecordGroup();
    recordGroup.userId = this.userId;
    recordGroup.category = this.category;
    recordGroup.recordType = this.recordType;
    recordGroup.title = this.title;
    recordGroup.content = this.content;
    recordGroup.location = this.location;
    recordGroup.point = parseLocationToPoint(this.latitude, this.longitude);
    return recordGroup;
  }
}
