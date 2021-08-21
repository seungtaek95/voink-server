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
      expect(res.body.userId).toBe(testUser1.id);
    });

    test('403 response, 다른 사용자의 레코드 조회 불가능', (done) => {
      // given
      const recordId = 5;

      // when
      agent
        .get(`/records/${recordId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(403, done);
    });
  });
});