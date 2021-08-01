import 'reflect-metadata';
import * as fs from 'fs';
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
    const rs = fs.createReadStream('');
    expect(
      await cloudStorageService.uploadUserPicture(rs, 2, 'small')
    ).not.toThrow();
  });
});