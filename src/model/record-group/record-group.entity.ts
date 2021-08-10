import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity({
  name: 'record_group'
})
export class RecordGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.RecordGroups)
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

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: Date;
}

function transformPoint(point: string) {

}