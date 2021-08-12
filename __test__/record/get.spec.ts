import * as express from 'express';
import * as supertest from 'supertest';
import { CreateRecordDto } from '../../src/model/record/record.dto';
import { AuthService } from '../../src/service/auth.service';
import container from '../../src/utils/container';
import { setup } from '../setup';

const app = express();
setup(app);

describe('GET records requests', () => {
  const agent = supertest(app);

  describe('GET /records:id', () => {
    test('200 response, 레코드 조회', async () => {
      // given
      const authServcie = container.get(AuthService);
      const testUser = { email: 'test@google.co.kr', id: 1 };
      const token = await authServcie.createJwt(testUser);
      const recordId = 1;

      // when
      const res = await agent
        .get(`/records/${recordId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      console.log(res.body);
      
    });
  });
});