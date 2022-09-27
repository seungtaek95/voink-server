import { PostRecordGroupRecordDto } from '../../../record/model/dto/post-record-group-record.dto';
import { Record } from '../../../record/model/record.entity';
import { RecordGroup } from '../record-group.entity';

export class CreateRecordGroupDto {
  constructor(
    public userId: number,
    public category: string,
    public title: string,
    public content: string,
    public location: string,
    public recordType: string,
    public latitude: number,
    public longitude: number,
    public records?: PostRecordGroupRecordDto[],
  ) {}

  toRecordGroup() {
    return RecordGroup.from(
      this.userId,
      this.category,
      this.title,
      this.content,
      this.location,
      this.latitude,
      this.longitude,
      this.recordType,
    );
  }

  toRecords(recordGroupId: number) {
    return this.records?.map(
      record => Record.from(
        this.userId,
        recordGroupId,
        record.title,
        record.duration,
        record.latitude,
        record.longitude,
        record.key,
      )
    );
  }
}
