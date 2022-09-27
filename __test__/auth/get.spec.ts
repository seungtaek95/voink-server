import * as express from 'express';
import * as supertest from 'supertest';
import { getTestUserToken } from '../seed/auth.seed';
import testUsers from '../seed/user.seed';
import { setup } from '../setup';

const app = express();
setup(app);

describe('GET auth requests', () => {
  const agent = supertest(app);

  describe('GET /auth', () => {
    test('401 response, Authorization 헤더 없음', (done) => {
      agent
        .get('/auth')
        .expect(401, done);
    });

    test('401 response, 잘못된 access token', (done) => {
      // given
      const token = 'invalid token';

      // when
      agent
        .get('/auth')
        .set('Authorization', token)
        .expect(401, done);
    });

    test('200 response, 사용자 정보 응답', async () => {
      // given
      const testUser1 = testUsers[0];
      const token = getTestUserToken(testUser1);

      // when
      const res = await agent
        .get('/auth')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      //then
      expect(res.body.id).toBe(testUser1.id);
      expect(res.body.email).toBe(testUser1.email);
      expect(res.body).toHaveProperty('expiresIn');
    });
  });
});