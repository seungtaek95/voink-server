import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RecordGroup } from '../record-group/record-group.entity';

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

  @Column()
  filepath: string;

  @Column({
    name: 'record_group_id',
    nullable: true,
  })
  recordGroupId: number

  @ManyToOne(() => RecordGroup, recordGroup => recordGroup.records)
  @JoinColumn({
    name: 'record_group_id'
  })
  recordGroup: RecordGroup

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: Date;
}
