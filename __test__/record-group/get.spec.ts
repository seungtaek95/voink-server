import * as express from 'express';
import * as supertest from 'supertest';
import { getTestUserToken } from '../seed/auth.seed';
import recordGroups from '../seed/record-group.seed';
import testUsers from '../seed/user.seed';
import { setup } from '../setup';

const app = express();
setup(app);

describe('GET record-groups requests', () => {
  const agent = supertest(app);
  const testUser1 = testUsers[0];
  const token = getTestUserToken(testUser1);

  describe('GET /record-groups', () => {
    test('200 response, 사용자의 레코드 그룹들 가져오기', async () => {
      // given

      // when
      const res = await agent
        .get('/record-groups')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      // then
      const expectedBody = expect.arrayContaining([{
        id: expect.any(Number),
        userId: testUser1.id,
        category: expect.any(String),
        title: expect.any(String),
        content: expect.any(String),
        location: expect.any(String),
        recordType: expect.any(String),
        latitude: expect.any(Number),
        longitude: expect.any(Number),
        createdAt: expect.any(String),
        records: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
            latitude: expect.any(Number),
            longitude: expect.any(Number),
            duration: expect.any(Number),
            recordUrl: expect.any(String),
            thumbnailUrl: expect.any(String)
          })
        ]),
      }]);
      expect(res.body).toEqual(expectedBody);
    });
  });

  describe('GET /record-groups/:id', () => {
    test('200 response, 레코드 그룹 하나 가져오기', async () => {
      // given
      const targetRecordGroup = recordGroups[0];

      // when
      const res = await agent
        .get(`/record-groups/${targetRecordGroup.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      // then
      const expectedBody = {
        id: expect.any(Number),
        userId: targetRecordGroup.userId,
        category: targetRecordGroup.category,
        title: targetRecordGroup.title,
        content: targetRecordGroup.content,
        location: targetRecordGroup.location,
        recordType: targetRecordGroup.recordType,
        latitude: expect.any(Number),
        longitude: expect.any(Number),
        createdAt: expect.any(String),
        records: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
            latitude: expect.any(Number),
            longitude: expect.any(Number),
            duration: expect.any(Number),
            recordUrl: expect.any(String),
            thumbnailUrl: expect.any(String)
          })
        ]),
      };
      expect(res.body).toEqual(expectedBody);
    });

    test('200 response, 다른 사용자의 레코드 그룹 가져올 수 없음', (done) => {
      // given
      const targetId = 3;

      // when
      agent
        .get(`/record-groups/${targetId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(403, done);
    });
  });
});