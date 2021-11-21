import * as express from 'express';
import * as supertest from 'supertest';
import { setup } from '../setup';

const app = express();
setup(app);

describe('GET handshake requests', () => {
  const agent = supertest(app);

  describe('GET /handshake', () => {
    test('200 response, handshake 응답', (done) => {
      agent
        .get('/handshake')
        .expect(200, done);
    });
  });
});