import { inject, injectable } from 'inversify';
import { IUserInfo } from '../common/interface/user.interface';
import { TYPE } from '../common/loader/container';
import { User } from './model/user.entity';
import { UserMapper } from './model/user.mapper';
import { UserRepository } from './user.repository';

@injectable()
export class UserService {
  constructor(
    @inject(TYPE.userRepository) private userRepository: UserRepository,
    @inject(UserMapper) private userMapper: UserMapper,
  ) {}

  findById(id: number) {
    return this.userRepository.findOne(id);
  }
  
  findByEmail(email: string) {
    return this.userRepository.findOne({ email });
  }

  async saveOne(provider: string, userInfo: IUserInfo): Promise<User> {
    const createUserDto = await this.userMapper.toCreateUserDto(provider, userInfo);
    return this.userRepository.createAndSave(createUserDto);
  }
}