import { Connection } from 'typeorm';
import databaseLoader from '../src/loader/database';
import { RecordGroup } from '../src/model/record-group/record-group.entity';
import { Record } from '../src/model/record/record.entity';
import { User } from '../src/model/user/user.entity';
import recordGroups from './seed/record-group.seed';
import records from './seed/record.seed';
import users from './seed/user.seed';

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

async function main() {
  const connection = await databaseLoader();
  
  await emptyDatabase(connection);
  await seedDatabase(connection);

  console.log('data inserted');

  connection.close();
}

main();