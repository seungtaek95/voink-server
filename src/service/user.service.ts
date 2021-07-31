import { inject, injectable } from 'inversify';
import { TYPE } from '../constant/type';
import { IUserInfo } from '../interface/user.interface';
import { User } from '../model/user/user.entity';
import { UserMapper } from '../model/user/user.mapper';
import { UserRepository } from '../model/user/user.repository';

@injectable()
export class UserService {
  constructor(
    @inject(TYPE.userRepository) private userRepository: UserRepository,
    @inject(UserMapper) private userMapper: UserMapper,
  ) {}

  findOneByEmail(email: string) {
    return this.userRepository.findOne({ email });
  }

  async saveOne(provider: string, userInfo: IUserInfo): Promise<User> {
    const createUserDto = await this.userMapper.toCreateUserDto(provider, userInfo);
    return this.userRepository.createAndSave(createUserDto);
  }
}