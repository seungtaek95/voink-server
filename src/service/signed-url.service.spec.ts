import 'reflect-metadata';
import { Connection } from 'typeorm';
import containerLoader from '../loader/container';
import container from '../utils/container';
import { SignedUrlService } from './signed-url.service';

describe('SignedUrlService', () => {
  containerLoader({} as Connection);
  const signedUrlService = container.get(SignedUrlService);

  test('레코드 리스트 조회', async () => {
    expect(async () => {
      await signedUrlService.getFiles();
    }).not.toThrow();
  });
});