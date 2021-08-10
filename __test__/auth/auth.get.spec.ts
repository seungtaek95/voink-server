import * as express from 'express';
import * as supertest from 'supertest';
import { AuthService } from '../../src/service/auth.service';
import container from '../../src/utils/container';
import { setup } from '../setup';

const app = express();
setup(app);

describe('GET auth requests', () => {
  const agent = supertest(app);

  describe('GET /auth', () => {
    test('200 response, 사용자 정보 응답', async () => {
      // given
      const authServcie = container.get(AuthService);
      const testUser = { email: 'test@google.co.kr', id: 1 };
      const token = await authServcie.createJwt(testUser);

      // when
      const res = await agent
        .get('/auth')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      //then
      expect(res.body).toStrictEqual(testUser);
    });
  });
});