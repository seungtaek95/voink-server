import * as express from 'express';
import * as supertest from 'supertest';
import { getTestUserToken } from '../seed/auth.seed';
import testUsers from '../seed/user.seed';
import { setup } from '../setup';

const app = express();
setup(app);

describe('GET record-groups requests', () => {
  const agent = supertest(app);
  const testUser1 = testUsers[0];
  const token = getTestUserToken(testUser1);

  describe('GET /record-groups/:id', () => {
    test('200 response, 사용자 레코드 그룹 리스트 가져오기', async () => {
      // given

      // when
      const res = await agent
        .get('/record-groups')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      // then
      expect(res.body.length).toBe(2);
    });
  });

  describe('GET /record-groups/:id', () => {
    test('200 response, 레코드 그룹 가져오기', async () => {
      // given
      const targetId = 1;

      // when
      const res = await agent
        .get(`/record-groups/${targetId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      // then
      expect(res.body.id).toBe(targetId);
    });

    test('200 response, 다른 사용자의 레코드 그룹 가져올 수 없음', (done) => {
      // given
      const targetId = 3;

      // when
      agent
        .get(`/record-groups/${targetId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(403, done);
    });
  });
});