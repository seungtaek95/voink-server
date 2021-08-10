import { inject, injectable } from 'inversify';
import { TYPE } from '../loader/container';
import { RecordGroupRepository } from '../model/record-group/record-group.repository';

@injectable()
export class RecordGroupService {
  constructor(
    @inject(TYPE.recordGroupRepository) private recordGroupRepository: RecordGroupRepository
  ) {}

  findById(id: number) {
    return this.recordGroupRepository.findOne(id);
  }
}