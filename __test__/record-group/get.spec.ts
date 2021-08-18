import * as express from 'express';
import * as supertest from 'supertest';
import { AuthService } from '../../src/service/auth.service';
import container from '../../src/utils/container';
import { setup } from '../setup';

const app = express();
setup(app);

describe('GET record-groups requests', () => {
  const agent = supertest(app);

  describe('GET /record-groups/:id', () => {
    test('200 response, 사용자 레코드 리스트 가져오기', async () => {
      // given
      const authServcie = container.get(AuthService);
      const testUser = { email: 'test1@test.com', id: 1 };
      const token = await authServcie.createJwt(testUser);

      // when
      const res = await agent
        .get('/record-groups')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      // then
      expect(res.body.length).toBe(2);
    });
  });

  describe('GET /record-groups/:id', () => {
    test('200 response, 레코드 가져오기', async () => {
      // given
      const authServcie = container.get(AuthService);
      const testUser = { email: 'test1@test.com', id: 1 };
      const token = await authServcie.createJwt(testUser);
      const targetId = 1;

      // when
      const res = await agent
        .get(`/record-groups/${targetId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      // then
      expect(res.body.id).toBe(targetId);
    });
  });
});