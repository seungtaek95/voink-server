import * as express from 'express';
import * as supertest from 'supertest';
import { AuthService } from '../../src/service/auth.service';
import container from '../../src/utils/container';
import { setup } from '../setup';

const app = express();
setup(app);

describe('DELETE records requests', () => {
  const agent = supertest(app);

  describe('DELETE /records:id', () => {
    test('200 response, 레코드 삭제', async () => {
      // given
      const authServcie = container.get(AuthService);
      const testUser = { email: 'test1@test.com', id: 1 };
      const token = await authServcie.createJwt(testUser);
      const recordId = 1;

      // when
      const res = await agent
        .delete(`/records/${recordId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      //then      
      expect(res.body.message).toBe('record deleted');
    });
  });
});