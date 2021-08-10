import { Application } from 'express';
import { Connection } from 'typeorm';
import loader from '../src/loader';

export function setup(app: Application) {
  let connection: Connection;

  beforeAll(async () => {
    const { dbConnection } = await loader(app);
    connection = dbConnection;
  });

  afterAll(() => {
    connection.close();
  });
}