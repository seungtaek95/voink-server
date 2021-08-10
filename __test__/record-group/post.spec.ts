import * as express from 'express';
import * as supertest from 'supertest';
import { CreateRecordGroupDto } from '../../src/model/record-group/record-group.dto';
import { AuthService } from '../../src/service/auth.service';
import container from '../../src/utils/container';
import { setup } from '../setup';

const app = express();
setup(app);

describe('GET auth requests', () => {
  const agent = supertest(app);

  describe('POST /record-groups', () => {
    test('201 response, 레코드 그룹 생성', async () => {
      // given
      const authServcie = container.get(AuthService);
      const testUser = { email: 'test@google.co.kr', id: 1 };
      const token = await authServcie.createJwt(testUser);
      const recordGroup: CreateRecordGroupDto = {
        userId: 1,
        category: 'testCategory',
        title: 'testTitle',
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
    });
  });
});