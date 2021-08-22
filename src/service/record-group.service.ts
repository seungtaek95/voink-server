import { inject, injectable } from 'inversify';
import { TYPE } from '../loader/container';
import { CreateRecordGroupDto } from '../model/record-group/record-group.dto';
import { RecordGroup } from '../model/record-group/record-group.entity';
import { RecordGroupMapper } from '../model/record-group/record-group.mapper';
import { RecordGroupRepository } from '../model/record-group/record-group.repository';
import { CloudStorageService } from './cloud-storage.service';

@injectable()
export class RecordGroupService {
  constructor(
    @inject(TYPE.recordGroupRepository) private recordGroupRepository: RecordGroupRepository,
    private cloudStorageService: CloudStorageService,
    private recordGroupMapper: RecordGroupMapper,
  ) {}

  saveOne(userId: number, createRecordGroupDto: CreateRecordGroupDto) {
    return this.recordGroupRepository.createAndSave(userId, createRecordGroupDto);
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