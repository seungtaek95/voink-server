import * as express from 'express';
import * as supertest from 'supertest';
import { setup } from '../setup';

const app = express();
setup(app);

describe('POST auth requests', () => {
  const agent = supertest(app);

  describe('POST /auth/login/facebook', () => {
    test('400 response, access token이 없음', (done) => {
      // given
      const requestBody = {};

      // when
      agent
        .post('/auth/login/facebook')
        .send(requestBody)
        .expect(400, done); // then
    });
  });
});