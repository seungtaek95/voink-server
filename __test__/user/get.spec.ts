import * as express from 'express';
import * as supertest from 'supertest';
import { getTestUserToken } from '../seed/auth.seed';
import testUsers from '../seed/user.seed';
import { setup } from '../setup';

const app = express();
setup(app);

describe('GET users requests', () => {
  const agent = supertest(app);
  const testUser1 = testUsers[0];
  const token = getTestUserToken(testUser1);

  describe('GET /users/me', () => {
    test('200 response, 현재 사용자 정보 조회', async () => {
      // given
      const user = testUser1;
      
      // when
      const res = await agent
        .get('/users/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      //then
      expect(res.body.id).toBe(user.id);
      expect(res.body.email).toBe(user.email);
      expect(res.body.name).toBe(user.name);
      expect(res.body.description).toBe(user.description);
    });
  });
});