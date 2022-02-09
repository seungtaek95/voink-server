import * as express from 'express';
import * as supertest from 'supertest';
import testUsers from '../seed/user.seed';
import { setup } from '../setup';
import { getTestUserToken } from '../seed/auth.seed';

const app = express();
setup(app);

describe('POST record-groups requests', () => {
  const agent = supertest(app);
  const testUser1 = testUsers[0];
  const token = getTestUserToken(testUser1);

  describe('POST /record-groups', () => {
    test('201 response, 레코드 없는 레코드 그룹 생성', async () => {
      // given
      const newRecordGroupTitle = 'test title';
      const recordGroup = {
        category: 'testCategory',
        title: newRecordGroupTitle,
        content: 'hello',
        location: 'testLocation',
        recordType: 'testRecordType',
        latitude: 20,
        longitude: 20,
      };

      // when
      const res = await agent
        .post('/record-groups')
        .set('Authorization', `Bearer ${token}`)
        .send(recordGroup)
        .expect(201);
      
      // then
      expect(res.body).toHaveProperty('id');
    });

    test('201 response, 레코드 있는 레코드 그룹 생성', async () => {
      // given
      const record = {
        key: 'recordKey',
        title: 'record',
        duration: 100,
        latitude: 30,
        longitude: 30,
      };
      const recordGroup = {
        category: 'testCategory',
        title: 'test title',
        content: 'hello',
        location: 'testLocation',
        recordType: 'testRecordType',
        latitude: 20,
        longitude: 20,
        records: [
          record
        ]
      };

      // when
      const res = await agent
        .post('/record-groups')
        .set('Authorization', `Bearer ${token}`)
        .send(recordGroup)
        .expect(201);
      
      // then
      expect(res.body).toHaveProperty('id');
    }, 500000000);

    test('400 response, request body에 정보 부족', done => {
      // given
      const newRecordGroupTitle = 'test title';
      const record = {
        key: '',
        title: '',
        duration: 100,
        latitude: 30,
        longitude: 30,
      };
      const recordGroup = {
        // category: 'testCategory',
        title: newRecordGroupTitle,
        content: 'hello',
        location: 'testLocation',
        // recordType: 'testRecordType',
        latitude: 20,
        longitude: 20,
        records: [
          record
        ]
      };

      // when
      agent
        .post('/record-groups')
        .set('Authorization', `Bearer ${token}`)
        .send(recordGroup)
        .expect(400, done); // then
    });
  });
});