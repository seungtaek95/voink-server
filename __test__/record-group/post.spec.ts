import * as express from 'express';
import * as supertest from 'supertest';
import testUsers from '../seed/user.seed';
import { CreateRecordGroupDto } from '../../src/model/record-group/record-group.dto';
import { setup } from '../setup';
import { getTestUserToken } from '../seed/auth.seed';

const app = express();
setup(app);

describe('POST record-groups requests', () => {
  const agent = supertest(app);
  const testUser1 = testUsers[0];
  const token = getTestUserToken(testUser1);

  describe('POST /record-groups', () => {
    test('201 response, 레코드 그룹 생성', async () => {
      // given
      const newRecordGroupTitle = 'test title';
      const recordGroup: CreateRecordGroupDto = {
        category: 'testCategory',
        title: newRecordGroupTitle,
        location: 'testLocation',
        recordType: 'testRecordType',
        latitude: 20,
        longitude: 20,
      };

      // when
      const res = await agent
        .post('/record-groups')
        .set('Authorization', `Bearer ${token}`)
        .send(recordGroup)
        .expect(201);
      
      // then
      expect(res.body.user.id).toBe(testUser1.id);
    });
  });
});