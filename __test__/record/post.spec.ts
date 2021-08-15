import * as express from 'express';
import * as supertest from 'supertest';
import { CreateRecordDto } from '../../src/model/record/record.dto';
import { AuthService } from '../../src/service/auth.service';
import container from '../../src/utils/container';
import { setup } from '../setup';

const app = express();
setup(app);

describe('POST records requests', () => {
  const agent = supertest(app);

  describe('POST /records', () => {
    test('201 response, 레코드 생성', async () => {
      // given
      const authServcie = container.get(AuthService);
      const testUser = { email: 'test1@test.com', id: 1 };
      const token = await authServcie.createJwt(testUser);
      const newRecordFilename = 'new.m4a';
      const record: CreateRecordDto = {
        recordGroupId: 1,
        filename: newRecordFilename,
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
      expect(res.body.filename).toBe(newRecordFilename);
    });
  });
});