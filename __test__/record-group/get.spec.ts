import * as express from 'express';
import * as supertest from 'supertest';
import { AuthService } from '../../src/service/auth.service';
import container from '../../src/utils/container';
import { setup } from '../setup';

const app = express();
setup(app);

describe('GET auth requests', () => {
  const agent = supertest(app);

  describe('GET /record-groups/:id', () => {
    test('200 response, 사용자 레코드 리스트 가져오기', async () => {
      // given
      const authServcie = container.get(AuthService);
      const testUser = { email: 'test@google.co.kr', id: 1 };
      const token = await authServcie.createJwt(testUser);

      // when
      const res = await agent
        .get('/record-groups')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      console.log(res.body);
    });
  });

  describe('GET /record-groups/:id', () => {
    test('200 response, 레코드 가져오기', async () => {
      // given
      const authServcie = container.get(AuthService);
      const testUser = { email: 'test@google.co.kr', id: 1 };
      const token = await authServcie.createJwt(testUser);
      const targetId = 2;

      // when
      const res = await agent
        .get(`/record-groups/${targetId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      console.log(res.body);
    });
  });
});