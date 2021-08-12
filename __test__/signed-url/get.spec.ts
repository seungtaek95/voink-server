import * as express from 'express';
import * as supertest from 'supertest';
import { AuthService } from '../../src/service/auth.service';
import container from '../../src/utils/container';
import { setup } from '../setup';

const app = express();
setup(app);

describe('GET signed url requests', () => {
  const agent = supertest(app);

  describe('GET /signed-url/upload', () => {
    test('200 response, 업로드 url 가져오기', async () => {
      // given
      const authServcie = container.get(AuthService);
      const testUser = { email: 'test@google.co.kr', id: 1 };
      const token = await authServcie.createJwt(testUser);
      const groupId = 1;
      const filename = 'foo.m4a';

      // when
      const res = await agent
        .get(`/signed-url/upload?recordGroupId=${groupId}&filename=${filename}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      console.log(res.body);
    });
  });

  describe('GET /signed-url/download', () => {
    test('200 response, 다운로드 url 가져오기', async () => {
      // given
      const authServcie = container.get(AuthService);
      const testUser = { email: 'test@google.co.kr', id: 1 };
      const token = await authServcie.createJwt(testUser);
      const recordId = 1;

      // when
      const res = await agent
        .get(`/signed-url/download?recordGroupId=${recordId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      console.log(res.body);
    });
  });
});