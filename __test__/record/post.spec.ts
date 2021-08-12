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
    test('201 response, 레코드 그룹 생성', async () => {
      // given
      const authServcie = container.get(AuthService);
      const testUser = { email: 'test@google.co.kr', id: 1 };
      const token = await authServcie.createJwt(testUser);
      const record: CreateRecordDto = {
        recordGroupId: 1,
        title: 'testTitle',
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
    });
  });
});