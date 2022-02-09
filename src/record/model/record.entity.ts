import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { parseLocationToPoint } from '../../common/utils/geomatric';
import { RecordGroup } from '../../record-group/model/record-group.entity';
import { User } from '../../user/model/user.entity';

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  duration: number;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  point: string;

  @Column({
    name: 'thumbnail_path',
  })
  thumbnailPath: string;

  @Column({
    name: 'record_path',
  })
  recordPath: string;

  @Column({
    name: 'user_id',
    nullable: true,
  })
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'user_id'
  })
  user: User;

  @Column({
    name: 'record_group_id',
    nullable: true,
  })
  recordGroupId: number;
  
  @Column({
    name: 'is_deleted',
    select: false,
    default: false,
  })
  isDeleted: boolean;
  
  @ManyToOne(() => RecordGroup, recordGroup => recordGroup.records, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'record_group_id'
  })
  recordGroup: RecordGroup;

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: Date;

  static from(
    userId: number,
    recordGroupId: number,
    title: string,
    duration: number,
    latitude: number,
    longitude: number,
    key: string,
  ) {
    const record = new Record();
    record.userId = userId;
    record.recordGroupId = recordGroupId;
    record.title = title;
    record.duration = duration;
    record.point = parseLocationToPoint(latitude, longitude);
    record.thumbnailPath = `${userId}/${recordGroupId}/${key}.jpg`;
    record.recordPath = `${userId}/${recordGroupId}/${key}.m4a`;
    record.isDeleted = false;
    record.createdAt = new Date();
    return record;
  }

  get key() {
    return this.recordPath.split('/').pop().split('.')[0];
  }
}
