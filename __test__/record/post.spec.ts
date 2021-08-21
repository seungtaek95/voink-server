import * as express from 'express';
import * as supertest from 'supertest';
import { getTestUserToken } from '../seed/auth.seed';
import testUsers from '../seed/user.seed';
import { CreateRecordDto } from '../../src/model/record/record.dto';
import { setup } from '../setup';

const app = express();
setup(app);

describe('POST records requests', () => {
  const agent = supertest(app);
  const testUser1 = testUsers[0];
  const token = getTestUserToken(testUser1);

  describe('POST /records', () => {
    test('201 response, 레코드 생성', async () => {
      // given
      const record: CreateRecordDto = {
        recordGroupId: 1,
        title: 'new record',
        duration: 300,
        latitude: 20,
        longitude: 20,
      };

      // when
      const res = await agent
        .post('/records')
        .set('Authorization', `Bearer ${token}`)
        .send(record)
        .expect(201);
      
      // then
      expect(res.body).toHaveProperty('record');
      expect(res.body).toHaveProperty('signedUrl');
    });
  });
});