import { inject, injectable } from 'inversify';
import { TYPE } from '../loader/container';
import { CreateRecordGroupDto } from '../model/record-group/record-group.dto';
import { RecordGroupRepository } from '../model/record-group/record-group.repository';

@injectable()
export class RecordGroupService {
  constructor(
    @inject(TYPE.recordGroupRepository) private recordGroupRepository: RecordGroupRepository
  ) {}

  saveOne(createRecordGroupDto: CreateRecordGroupDto) {
    return this.recordGroupRepository.createAndSave(createRecordGroupDto);
  }

  findById(id: string | number) {
    return this.recordGroupRepository.findById(id);
  }

  findByUser(userId: string | number) {
    return this.recordGroupRepository.findByUser(userId);
  }
}