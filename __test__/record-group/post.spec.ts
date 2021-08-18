import * as express from 'express';
import * as supertest from 'supertest';
import { CreateRecordGroupDto } from '../../src/model/record-group/record-group.dto';
import { AuthService } from '../../src/service/auth.service';
import container from '../../src/utils/container';
import { setup } from '../setup';

const app = express();
setup(app);

describe('POST record-groups requests', () => {
  const agent = supertest(app);

  describe('POST /record-groups', () => {
    test('201 response, 레코드 그룹 생성', async () => {
      // given
      const authServcie = container.get(AuthService);
      const testUser = { email: 'test1@test.com', id: 1 };
      const token = await authServcie.createJwt(testUser);
      const newRecordGroupTitle = 'test title';
      const recordGroup: CreateRecordGroupDto = {
        userId: 1,
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
      expect(res.body.title).toBe(newRecordGroupTitle);
    });
  });
});