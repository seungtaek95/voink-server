import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Record } from '../record/record.entity';
import { User } from '../user/user.entity';

@Entity({
  name: 'record_group'
})
export class RecordGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'user_id',
    nullable: true,
  })
  userId: number

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'user_id'
  })
  user: User;

  @Column({
    nullable: true
  })
  category: string;
  
  @Column()
  title: string;

  @Column({
    default: ''
  })
  content: string;
  
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
  })
  point: string;
  
  @Column({
    name: 'is_deleted',
    select: false,
    default: false,
  })
  isDeleted: boolean;

  @OneToMany(() => Record, record => record.recordGroupId)
  records: Record[];

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: Date;
}
