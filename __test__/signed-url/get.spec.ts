import * as express from 'express';
import * as supertest from 'supertest';
import { getTestUserToken } from '../seed/auth.seed';
import testUsers from '../seed/user.seed';
import { setup } from '../setup';

const app = express();
setup(app);

describe('GET signed url requests', () => {
  const agent = supertest(app);
  const testUser1 = testUsers[0];
  const token = getTestUserToken(testUser1);

  describe('GET /signed-url/download', () => {
    test('200 response, 다운로드 url 가져오기', async () => {
      // given
      const recordId = 1;

      // when
      const res = await agent
        .get(`/signed-url/download?recordId=${recordId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      // then
      expect(res.body).toHaveProperty('url');
    });
  
    test('403 response, 다른 사용자의 다운로드 url 가져올 수 없음', (done) => {
      // given
      const recordId = 5;
  
      // when
      agent
        .get(`/signed-url/download?recordId=${recordId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(403, done);
    });
  });
});