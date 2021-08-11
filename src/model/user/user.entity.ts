import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: Date;
}
