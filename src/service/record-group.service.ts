import { inject, injectable } from 'inversify';
import { TYPE } from '../loader/container';
import { CreateRecordGroupDto } from '../model/record-group/record-group.dto';
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
      await this.recordService.save(userId, recordGroup.id, recordGroupPath, createRecordGroupDto.records);
      await Promise.all(createRecordGroupDto.records.map(record => {
        this.cloudStorageService.moveRecordToGroupDir(userId, recordGroupPath, record.key);
      }));
    }
    return recordGroup;
  }

  async findById(id: string | number) {
    const recordGroup = await this.recordGroupRepository.findById(id);
    return this.recordGroupMapper.toRecordGroupDto(recordGroup);
  }

  async findByUserId(userId: string | number) {
    const recordGroup = await this.recordGroupRepository.findByUserId(userId);
    return this.recordGroupMapper.toRecordGroupDto(recordGroup);
  }

  async deleteOne(userId: string | number, recordGroup: RecordGroup) {
    await this.recordGroupRepository.delete(recordGroup.id);
    const recordGroupPath = `${userId}/${recordGroup.id}`;
    return this.cloudStorageService.deleteRecordGroup(recordGroupPath);
  }
}