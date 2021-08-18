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

  getRecordGroupPath(recordGroup: RecordGroup) {
    return `${recordGroup.userId}/${recordGroup.id}`;
  }

  saveOne(createRecordGroupDto: CreateRecordGroupDto) {
    return this.recordGroupRepository.createAndSave(createRecordGroupDto);
  }

  findById(id: string | number) {
    return this.recordGroupRepository.findById(id);
  }

  findByUserId(userId: string | number) {
    return this.recordGroupRepository.findByUserId(userId);
  }

  async deleteOne(recordGroup: RecordGroup) {
    await this.recordGroupRepository.delete(recordGroup.id);
    const recordGroupPath = this.getRecordGroupPath(recordGroup);
    return this.cloudStorageService.deleteRecordGroup(recordGroupPath);
  }
}