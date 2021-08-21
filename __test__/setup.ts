import { Application } from 'express';
import { Connection } from 'typeorm';
import loader from '../src/loader';
import { User } from '../src/model/user/user.entity';
import { RecordGroup } from '../src/model/record-group/record-group.entity';
import { Record } from '../src/model/record/record.entity';
import recordGroups from './seed/record-group.seed';
import records from './seed/record.seed';
import users from './seed/user.seed';

export function setup(app: Application) {
  let connection: Connection;

  beforeAll(async () => {
    const { dbConnection } = await loader(app);
    connection = dbConnection;
    await emptyDatabase(connection);
  });
  
  beforeEach(async () => {
    await seedDatabase(connection);
  });
  
  afterEach(async () => {
    await emptyDatabase(connection);
  });
  
  afterAll(async () => {
    await emptyDatabase(connection);
    connection.close();
  });
}

export async function seedDatabase(connection: Connection) {
  const entityManager = connection.manager;
  await connection.synchronize();
  await entityManager.save(User, users);
  await entityManager.save(RecordGroup, recordGroups);
  await entityManager.save(Record, records);
}

export function emptyDatabase(connection: Connection) {
  return connection.dropDatabase();
}