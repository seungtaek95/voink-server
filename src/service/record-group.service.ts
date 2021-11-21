import { inject, injectable } from 'inversify';
import { TYPE } from '../loader/container';
import { CreateRecordGroupDto } from '../model/record-group/dto/create-record-group.dto';
import { RecordGroupMapper } from '../model/record-group/record-group.mapper';
import { RecordGroupRepository } from '../model/record-group/record-group.repository';
import { HttpError } from '../utils/util';
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
    return this.recordGroupMapper.toDto(newRecordGroup);
  }

  async findById(id: string | number) {
    const recordGroup = await this.recordGroupRepository.findById(id);
    return this.recordGroupMapper.toDto(recordGroup);
  }

  async findByUserId(userId: string | number) {
    const recordGroups = await this.recordGroupRepository.findByUserId(userId);
    return recordGroups.map(recordGroup => this.recordGroupMapper.toDto(recordGroup));
  }

  async deleteById(id: string | number) {
    const result = await this.recordGroupRepository.update(id, { isDeleted: true });
    if (result.affected !== 1) {
      throw new HttpError(`Failed to set recordGroup.isDelete to true. id: ${id}`, 500);
    }
  }
}