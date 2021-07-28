import mysqlLoader from '../loader/mysql';
import containerLoader from '../loader/container';
import container from '../utils/container';
import { UserService } from './user.service';
import { Connection } from 'typeorm';

describe('UserService', () => {
  let connection: Connection;
  let userService: UserService;

  beforeAll(async () => {
    connection = await mysqlLoader();
    containerLoader(connection);
    userService = container.get(UserService);
  });

  afterAll(() => {
    connection.close();
  });

  test('사용자 가져오기', async () => {
    console.log(await userService.findOneByEmail('seungtaek95@naver.com'));
    
  });
  test('사용자 저장하기', async () => {
    expect(await userService.saveOne('FACEBOOK', { name: 'Kim', email: 'foo@google.co.kr' }))
      .not.toThrow();
  });
});