import mysqlLoader from '../loader/database';
import containerLoader from '../loader/container';
import container from '../utils/container';
import { Connection } from 'typeorm';
import { RecordGroupService } from './record-group.service';

describe('RecordGroupService', () => {
  let connection: Connection;
  let recordGroupService: RecordGroupService;

  beforeAll(async () => {
    connection = await mysqlLoader();
    containerLoader(connection);
    recordGroupService = container.get(RecordGroupService);
  });

  afterAll(() => {
    connection.close();
  });

  test('레코드 그룹 가져오기', async () => {
    console.log(await recordGroupService.findById(1));
  });
});