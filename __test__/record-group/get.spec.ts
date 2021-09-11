import * as express from 'express';
import * as supertest from 'supertest';
import { getTestUserToken } from '../seed/auth.seed';
import recordGroups from '../seed/record-group.seed';
import testUsers from '../seed/user.seed';
import { setup } from '../setup';

const app = express();
setup(app);

describe('GET record-groups requests', () => {
  const agent = supertest(app);
  const testUser1 = testUsers[0];
  const token = getTestUserToken(testUser1);

  describe('GET /record-groups/:id', () => {
    test('200 response, 레코드 그룹 하나 가져오기', async () => {
      // given
      const targetRecordGroup = recordGroups[0];

      // when
      const res = await agent
        .get(`/record-groups/${targetRecordGroup.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      // then
      expect(res.body.id).toBe(targetRecordGroup.id);
      expect(res.body.title).toBe(targetRecordGroup.title);
      expect(res.body.location).toBe(targetRecordGroup.location);
      expect(res.body.category).toBe(targetRecordGroup.category);
      expect(res.body.recordType).toBe(targetRecordGroup.recordType);
      expect(res.body).toHaveProperty('latitude');
      expect(res.body).toHaveProperty('longitude');
      expect(res.body).toHaveProperty('user');
      expect(res.body).toHaveProperty('records');
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