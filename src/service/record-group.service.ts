import { inject, injectable } from 'inversify';
import { TYPE } from '../loader/container';
import { CreateRecordGroupDto } from '../model/record-group/dto/create-record-group.dto';
import { RecordGroupDto } from '../model/record-group/dto/record-group.dto';
import { RecordGroup } from '../model/record-group/record-group.entity';
import { RecordGroupMapper } from '../model/record-group/record-group.mapper';
import { RecordGroupRepository } from '../model/record-group/record-group.repository';
import { CloudStorageService } from './cloud-storage.service';
import { RecordService } from './record.service';

@injectable()
export class RecordGroupService {
  constructor(
    @inject(TYPE.recordGroupRepository) private recordGroupRepository: RecordGroupRepository,
    private cloudStorageService: CloudStorageService,
    private recordService: RecordService,
    private recordGroupMapper: RecordGroupMapper,
  ) {}

  async saveOne(userId: number, createRecordGroupDto: CreateRecordGroupDto) {
    const recordGroup = this.recordGroupMapper.toEntity(userId, createRecordGroupDto);
    const newRecordGroup = await this.recordGroupRepository.save(recordGroup);
    if (createRecordGroupDto.records?.length > 0) {
      const recordGroupPath = this.cloudStorageService.getRecordGroupPath(userId, newRecordGroup.id);
      // 레코드 저장
      await this.recordService.save(userId, recordGroup.id, recordGroupPath, createRecordGroupDto.records);
      // 임시 폴더의 레코드 파일을 그룹 디렉토리로 이동
      await Promise.all(createRecordGroupDto.records.map(record => {
        this.cloudStorageService.moveRecordToGroupDir(userId, recordGroupPath, record.key);
      }));
    }
    return newRecordGroup;
  }

  findById(id: number) {
    return this.recordGroupRepository.findById(id);
  }

  findByUserId(userId: number) {
    return this.recordGroupRepository.findByUserId(userId);
  }

  setToDeleted(id: number) {
    return this.recordGroupRepository.setToDeleted(id);
  }

  toDto<T extends RecordGroup | RecordGroup[]>(recordGroups: T): T extends RecordGroup ? RecordGroupDto : RecordGroupDto[];
  toDto(recordGroups: RecordGroup | RecordGroup[]) {
    if (Array.isArray(recordGroups)) {
      return recordGroups.map(recordGroup => this.recordGroupMapper.toDto(recordGroup));
    }
    return this.recordGroupMapper.toDto(recordGroups);
  }
}