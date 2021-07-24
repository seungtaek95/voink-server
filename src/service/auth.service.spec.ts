import 'reflect-metadata';
import { Connection } from 'typeorm';
import containerLoader from '../loader/container';
import container from '../utils/container';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  containerLoader({} as Connection);
  const authService = container.get(AuthService);

  test('jwt 생성 및 검증', async () => {
    const payload = {
      id: '1',
      name: 'Kim'
    };

    const jwt = await authService.createJwt(payload);
    const decoded = await authService.verifyJwt(jwt);

    expect(decoded.name).toBe('Kim');
  });
});