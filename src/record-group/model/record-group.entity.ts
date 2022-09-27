import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { parseLocationToPoint } from '../../common/utils/geomatric';
import { Record } from '../../record/model/record.entity';
import { User } from '../../user/model/user.entity';

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
  userId: number;

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

  static from(
    userId: number,
    category: string,
    title: string,
    content: string,
    location: string,
    latitude: number,
    longitude: number,
    recordType: string,
  ) {
    const recordGroup = new RecordGroup();
    recordGroup.userId = userId;
    recordGroup.category = category;
    recordGroup.title = title;
    recordGroup.content = content;
    recordGroup.location = location;
    recordGroup.point = parseLocationToPoint(latitude, longitude);
    recordGroup.recordType = recordType;
    recordGroup.isDeleted = false;
    recordGroup.createdAt = new Date();
    return recordGroup;
  }
}
