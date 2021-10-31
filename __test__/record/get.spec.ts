import * as express from 'express';
import * as supertest from 'supertest';
import { getTestUserToken } from '../seed/auth.seed';
import testUsers from '../seed/user.seed';
import { setup } from '../setup';

const app = express();
setup(app);

describe('GET records upload urls', () => {
  const agent = supertest(app);
  const testUser1 = testUsers[0];
  const token = getTestUserToken(testUser1);

  describe('GET /records/upload-url', () => {
    test('200 response, upload url들 가져오기', async () => {
      // given
      const count = 5;

      // when
      const res = await agent
        .get(`/records/upload-url?count=${count}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      //then
      const expectedBody = {
        key: expect.any(String),
        recordUrl: expect.any(String),
        thumbnailUrl: expect.any(String),
      };
      expect(res.body.length).toBe(count);
      res.body.forEach((record: any) => expect(record).toEqual(expectedBody));
    });

    test('400 response, count query가 없음', done => {
      // given

      // when
      agent
        .get('/records/upload-url')
        .set('Authorization', `Bearer ${token}`)
        .expect(400, done); //then
    });
  });
});

describe('GET records requests', () => {
  const agent = supertest(app);
  const testUser1 = testUsers[0];
  const token = getTestUserToken(testUser1);

  describe('GET /records:id', () => {
    test('200 response, 레코드 조회', async () => {
      // given
      const recordId = 1;

      // when
      const res = await agent
        .get(`/records/${recordId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      //then
      const expectedBody = {
        id: expect.any(Number),
        userId: testUser1.id,
        recordGroupId: expect.any(Number),
        title: expect.any(String),
        latitude: expect.any(Number),
        longitude: expect.any(Number),
        duration: expect.any(Number),
        recordUrl: expect.any(String),
        thumbnailUrl: expect.any(String),
        createdAt: expect.any(String)
      };
      expect(res.body).toEqual(expectedBody);
    });

    test('403 response, 다른 사용자의 레코드 조회 불가능', (done) => {
      // given
      const recordId = 5;

      // when
      agent
        .get(`/records/${recordId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(403, done);
    });
  });
});