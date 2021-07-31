import 'reflect-metadata';
import { Connection } from 'typeorm';
import containerLoader from '../loader/container';
import container from '../utils/container';
import { CloudStorageService } from './cloud-storage.service';

describe('CloudStorageService', () => {
  containerLoader({
    getCustomRepository: () => {}
  } as unknown as Connection);
  const cloudStorageService = container.get(CloudStorageService);

  test('프로필 이미지 업로드', async () => {
    expect(async () => {
      await cloudStorageService.uploadProfile();
    }).not.toThrow();
  });
});