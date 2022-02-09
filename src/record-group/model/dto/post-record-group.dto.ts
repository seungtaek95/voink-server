import { plainToClass, Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { PostRecordGroupRecordDto } from '../../../record/model/dto/post-record-group-record.dto';
import { CreateRecordGroupDto } from './create-record-group.dto';

export class PostRecordGroupDto {
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
  @Type(() => PostRecordGroupRecordDto)
  records?: PostRecordGroupRecordDto[];

  toCreateRecordGroupDto(userId: number) {
    const createRecordGroupDto = plainToClass(CreateRecordGroupDto, this);
    createRecordGroupDto.userId = userId;
    return createRecordGroupDto;
  }
}
