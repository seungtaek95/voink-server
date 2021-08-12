import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Record } from '../record/record.entity';
import { User } from '../user/user.entity';

@Entity({
  name: 'record_group'
})
export class RecordGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User | number;

  @Column()
  category: string;
  
  @Column()
  title: string;
  
  @Column()
  location: string;
  
  @Column({
    name: 'record_type'
  })
  recordType: string;
  
  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  point: string;

  @OneToMany(() => Record, record => record.recordGroupId)
  Records: Record[];

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: Date;
}
