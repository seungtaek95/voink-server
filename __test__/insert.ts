import databaseLoader from '../src/loader/database';
import { emptyDatabase, seedDatabase } from './setup';

async function main() {
  const connection = await databaseLoader();
  
  await emptyDatabase(connection);
  await seedDatabase(connection);

  console.log('data inserted');

  connection.close();
}

main();