import { Application } from 'express';
import { Connection } from 'typeorm';
import loader from '../src/loader';
import { emptyDatabase, seedDatabase } from './insert';

export function setup(app: Application) {
  let connection: Connection;

  beforeAll(async () => {
    const { dbConnection } = await loader(app);
    connection = dbConnection;
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
