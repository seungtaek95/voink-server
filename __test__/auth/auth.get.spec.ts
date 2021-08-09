import * as express from 'express';
import { setup } from '../setup';

const app = express();
setup(app);

describe('GET auth requests', () => {
  describe('GET /auth', () => {
    test('200 response, 사용자 정보 응답', () => {
      
    });
  });
});