import { inject, injectable } from 'inversify';
import { Connection } from 'typeorm';
import { TYPE } from '../loader/container';
import { CreateRecordGroupDto } from '../model/record-group/dto/create-record-group.dto';
import { RecordGroupDto } from '../model/record-group/dto/record-group.dto';
import { RecordGroup } from '../model/record-group/record-group.entity';
import { RecordGroupMapper } from '../model/record-group/record-group.mapper';
import { RecordGroupRepository } from '../model/record-group/record-group.repository';
import { RecordMapper } from '../model/record/record.mapper';
import { CloudStorageService } from './cloud-storage.service';

@injectable()
export class RecordGroupService {
  constructor(
    @inject(TYPE.connection) private connection: Connection,
    @inject(TYPE.recordGroupRepository) private recordGroupRepository: RecordGroupRepository,
    private cloudStorageService: CloudStorageService,
    private recordGroupMapper: RecordGroupMapper,
    private recordMapper: RecordMapper,
  ) {}

  async saveOne(createRecordGroupDto: CreateRecordGroupDto) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const recordGroup = await queryRunner.manager.save(createRecordGroupDto.toEntity());
      if (createRecordGroupDto.records?.length > 0) {
        // 레코드 저장
        const records = createRecordGroupDto.records.map(createRecordDto => (
          this.recordMapper.toEntity(createRecordGroupDto.userId, recordGroup.id, createRecordDto)
        ));
        const savedRecords = await queryRunner.manager.save(records);
        // 임시 폴더의 레코드 파일을 그룹 디렉토리로 이동
        await Promise.all(savedRecords.map(record => {
          this.cloudStorageService.moveRecordToGroupDir(record);
        }));
      }
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return recordGroup;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
  }

  findById(id: number) {
    return this.recordGroupRepository.findById(id);
  }

  findByUserId(userId: number) {
    return this.recordGroupRepository.findByUserId(userId);
  }

  setToDeleted(id: number) {
    return this.recordGroupRepository.setToDeleted(id);
  }

  toDto<T extends RecordGroup | RecordGroup[]>(recordGroups: T): T extends RecordGroup ? RecordGroupDto : RecordGroupDto[];
  toDto(recordGroups: RecordGroup | RecordGroup[]) {
    if (Array.isArray(recordGroups)) {
      return recordGroups.map(recordGroup => this.recordGroupMapper.toDto(recordGroup));
    }
    return this.recordGroupMapper.toDto(recordGroups);
  }
}