import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  provider: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  name: string;

  @Column({
    default: ''
  })
  description: string;

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: Date;
}
