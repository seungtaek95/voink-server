import { CreateUserDto } from '../../src/model/user/user.dto';

const users: CreateUserDto[] = [
  {
    provider: 'FACEBOOK',
    email: 'test1@test.com',
    name: 'test1',
  },
  {
    provider: 'FACEBOOK',
    email: 'test2@test.com',
    name: 'test2',
  },
];

export default users;