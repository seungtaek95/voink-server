import { inject, injectable } from 'inversify';
import { TYPE } from '../constant/type';
import { CreateUserDto } from '../interface/dto';
import { User } from '../model/entity/user.entity';
import { UserRepository } from '../model/repository/user.repository';
import { IUserInfo } from './auth.service';

@injectable()
export class UserService {
  constructor(
    @inject(TYPE.userRepository) private userRepository: UserRepository,
  ) {}

  findOneByEmail(email: string) {
    return this.userRepository.findOne({ email });
  }

  getCreateUserDto(provider: string, userInfo: IUserInfo): CreateUserDto {
    const createUserDto = new CreateUserDto();
    createUserDto.provider = provider;
    createUserDto.name = userInfo.name;
    createUserDto.email = userInfo.email;
    return createUserDto;
  }

  createOne(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.createAndSave(createUserDto);
  }
}