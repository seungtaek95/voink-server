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
    nullable: true,
  })
  point: string;

  @Column()
  filename: string;

  @ManyToOne(() => RecordGroup)
  @JoinColumn({
    name: 'record_group_id'
  })
  recordGroupId: number

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: Date;
}
