import * as express from 'express';
import * as supertest from 'supertest';
import { getTestUserToken } from '../seed/auth.seed';
import testUsers from '../seed/user.seed';
import { setup } from '../setup';

const app = express();
setup(app);

describe('GET records requests', () => {
  const agent = supertest(app);
  const testUser1 = testUsers[0];
  const token = getTestUserToken(testUser1);

  describe('GET /records:id', () => {
    test('200 response, 레코드 조회', async () => {
      // given
      const recordId = 1;

      // when
      const res = await agent
        .get(`/records/${recordId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      //then
      expect(res.body.id).toBe(recordId);
    });
  });
});