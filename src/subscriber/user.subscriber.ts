import { EventEmitter } from 'events';
import { CloudStorageService } from '../service/cloud-storage.service';
import container from '../utils/container';

const userSubscriber = new EventEmitter();

// 사용자 이미지 받아와서 cloud storage에 저장
userSubscriber.on('userSaved', (userId: number, accessToken: string) => {
  const cloudStorageService = container.get(CloudStorageService);
});