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
  user: User;

  @Column()
  category: string;
  
  @Column()
  title: string;
  
  @Column()
  location: string;
  
  @Column()
  type: string;
  
  @Column('point')
  latitude: number;
  
  @Column('point')
  longitude: number;

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: Date;
}