import { inject, injectable } from 'inversify';
import { TYPE } from '../constant/type';
import { CreateUserDto } from '../interface/dto';
import { User } from '../model/entity/user.entity';
import { UserRepository } from '../model/repository/user.repository';

@injectable()
export class UserService {
  constructor(
    @inject(TYPE.userRepository) private userRepository: UserRepository,
  ) {}

  findOneByEmail(email: string) {
    return this.userRepository.findOne({ email });
  }

  createOne(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.createAndSave(createUserDto);
  }
}