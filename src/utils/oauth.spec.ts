import 'reflect-metadata';
import { Connection } from 'typeorm';
import containerLoader from '../loader/container';
import container from '../utils/container';
import { FacebookOAuth } from './oauth';

describe('FacebookOAuth', () => {
  containerLoader({
    getCustomRepository: () => {}
  } as unknown as Connection);
  const facebookOAuth = container.get(FacebookOAuth);

  test('프로필 이미지 가져오기', async () => {
    const result = await facebookOAuth.getUserImageStream(
      '', // accessToken
      50
    );
    expect(result.readable).toBe(true);
  });
});