import { injectable } from 'inversify';
import { RecordGroupRepository } from '../model/record-group/record-group.repository';

@injectable()
export class RecordGroupService {
  constructor(
    private recordGroupRepository: RecordGroupRepository
  ) {}

  findById(id: number) {
    return this.recordGroupRepository.findOne(id);
  }
}