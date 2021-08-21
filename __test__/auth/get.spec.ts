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
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('email');
    });
  });
});