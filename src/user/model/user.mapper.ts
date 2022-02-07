import { validateOrReject } from 'class-validator';
import { injectable } from 'inversify';
import { IUserInfo } from '../../common/interface/user.interface';
import { CreateUserDto } from './user.dto';

@injectable()
export class UserMapper {
  async toCreateUserDto(provider: string, userInfo: IUserInfo ) {
    const createUserDto = new CreateUserDto();
    createUserDto.provider = provider;
    createUserDto.name = userInfo.name;
    createUserDto.email = userInfo.email;
    await validateOrReject(createUserDto);

    return createUserDto;
  }
}