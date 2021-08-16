import { inject, injectable } from 'inversify';
import { TYPE } from '../loader/container';
import { CreateRecordGroupDto } from '../model/record-group/record-group.dto';
import { RecordGroup } from '../model/record-group/record-group.entity';
import { RecordGroupRepository } from '../model/record-group/record-group.repository';
import { CloudStorageService } from './cloud-storage.service';

@injectable()
export class RecordGroupService {
  constructor(
    @inject(TYPE.recordGroupRepository) private recordGroupRepository: RecordGroupRepository,
    private cloudStorageService: CloudStorageService,
  ) {}

  getRecordGroupPath(userId: string | number, recordGroupId: string | number) {
    return `${userId}/${recordGroupId}`;
  }

  saveOne(createRecordGroupDto: CreateRecordGroupDto) {
    return this.recordGroupRepository.createAndSave(createRecordGroupDto);
  }

  findById(id: string | number) {
    return this.recordGroupRepository.findById(id);
  }

  findByUser(userId: string | number) {
    return this.recordGroupRepository.findByUser(userId);
  }

  async deleteOne(recordGroup: RecordGroup) {
    await this.recordGroupRepository.delete(recordGroup.id);
    const recordGroupPath = this.getRecordGroupPath(recordGroup.userId, recordGroup.id);
    return this.cloudStorageService.deleteRecordGroup(recordGroupPath);
  }
}