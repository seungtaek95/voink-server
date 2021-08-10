import { validateOrReject } from 'class-validator';
import { injectable } from 'inversify';
import { CreateUserDto } from './user.dto';
import { IUserInfo } from '../../interface/user.interface';

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