import { inject, injectable } from 'inversify';
import { Connection } from 'typeorm';
import { TYPE } from '../common/loader/container';
import { CreateRecordGroupDto } from './model/dto/create-record-group.dto';
import { RecordGroupMapper } from './model/record-group.mapper';
import { RecordGroupRepository } from './record-group.repository';
import { CloudStorageService } from '../cloud-storage/cloud-storage.service';
import { HttpError } from '../common/utils/util';

@injectable()
export class RecordGroupService {
  constructor(
    @inject(TYPE.connection) private connection: Connection,
    @inject(TYPE.recordGroupRepository) private recordGroupRepository: RecordGroupRepository,
    private cloudStorageService: CloudStorageService,
    private recordGroupMapper: RecordGroupMapper,
  ) {}

  async save(createRecordGroupDto: CreateRecordGroupDto) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // 레코드 그룹 저장
      const recordGroup = await queryRunner.manager.save(createRecordGroupDto.toRecordGroup());
      if (createRecordGroupDto.records?.length > 0) {
        // 레코드 저장
        const records = await queryRunner.manager.save(createRecordGroupDto.toRecords(recordGroup.id));
        // 임시 폴더의 레코드 파일을 그룹 디렉토리로 이동
        await Promise.all(records.map(
          record => this.cloudStorageService.moveRecordFromTempToGroupDir(record)
        ));
      }
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return recordGroup.id;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
  }

  async findById(id: number, userId: number) {
    const recordGroup = await this.recordGroupRepository.findById(id);
    if (!recordGroup || recordGroup.userId !== userId) {
      throw new HttpError('Not found', 404);
    }
    return this.recordGroupMapper.toDto(recordGroup);
  }

  async findByUserId(userId: number) {
    const recordGroups = await this.recordGroupRepository.findByUserId(userId);
    return recordGroups.map(recordGroup => this.recordGroupMapper.toDto(recordGroup));
  }

  setToDeleted(id: number) {
    return this.recordGroupRepository.setToDeleted(id);
  }
}