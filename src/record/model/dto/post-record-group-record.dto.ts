import { plainToClass } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { Record } from '../record.entity';
import { CreateRecordDto } from './create-record.dto';

export class PostRecordGroupRecordDto {
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

  toCreateRecordDto(userId: number, recordGroupId: number) {
    const createRecordDto = plainToClass(CreateRecordDto, this);
    createRecordDto.userId = userId;
    createRecordDto.recordGroupId = recordGroupId;
    return createRecordDto;
  }
}
