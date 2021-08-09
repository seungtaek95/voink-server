import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RecordGroup } from '../record-group/record-group.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  provier: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  description: string;

  @OneToMany(() => RecordGroup, RecordGroup => RecordGroup.user)
  RecordGroups: RecordGroup[];
}
