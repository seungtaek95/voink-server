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
    const recordGroup = await this.recordGroupRepository.createAndSave(userId, createRecordGroupDto);
    if (createRecordGroupDto.records?.length > 0) {
      const recordGroupPath = this.cloudStorageService.getRecordGroupPath(userId, recordGroup.id);
      // 레코드 저장
      await this.recordService.save(userId, recordGroup.id, recordGroupPath, createRecordGroupDto.records);
      // 임시 폴더의 레코드 파일을 그룹 디렉토리로 이동
      await Promise.all(createRecordGroupDto.records.map(record => {
        this.cloudStorageService.moveRecordToGroupDir(userId, recordGroupPath, record.key);
      }));
    }
    return recordGroup;
  }

  async findById(id: string | number) {
    const recordGroup = await this.recordGroupRepository.findById(id);
    return this.mapToDto(recordGroup);
  }

  async findByUserId(userId: string | number) {
    const recordGroups = await this.recordGroupRepository.findByUserId(userId);
    return this.mapToDto(recordGroups);
  }

  private mapToDto<T extends RecordGroup | RecordGroup[]>(recordGroups: T): T extends RecordGroup ? RecordGroupDto : RecordGroupDto[];
  private mapToDto(recordGroups: RecordGroup | RecordGroup[]) {
    if (Array.isArray(recordGroups)) {
      return recordGroups.map(recordGroup => this.recordGroupMapper.toRecordGroupDto(recordGroup));
    }
    return this.recordGroupMapper.toRecordGroupDto(recordGroups);
  }
}