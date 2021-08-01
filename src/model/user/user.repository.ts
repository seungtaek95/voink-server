import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from '../../dto/user.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  createAndSave(createUserDto: CreateUserDto) {
    const user = this.create();
    user.provier = createUserDto.provider;
    user.name = createUserDto.name;
    user.email = createUserDto.email;

    return this.save(user);
  }
}