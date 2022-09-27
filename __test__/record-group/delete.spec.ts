import * as express from 'express';
import * as supertest from 'supertest';
import { getTestUserToken } from '../seed/auth.seed';
import recordGroups from '../seed/record-group.seed';
import testUsers from '../seed/user.seed';
import { setup } from '../setup';

const app = express();
setup(app);

describe('DELETE record-groups requests', () => {
  const agent = supertest(app);
  const testUser1 = testUsers[0];
  const token = getTestUserToken(testUser1);

  describe('DELETE /record-groups/{id}', () => {
    test('200 response, 사용자의 레코드 그룹 삭제', async () => {
      // given
      const targetRecordGroup = recordGroups[0];

      // when
      await agent
        .delete(`/record-groups/${targetRecordGroup.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200); // then

      agent;
    });
  });
});