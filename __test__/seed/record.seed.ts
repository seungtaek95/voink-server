import { CreateRecordDto } from '../../src/model/record/record.dto';

const records: CreateRecordDto[] = [
  {
    recordGroupId: 1,
    filename: 'test1.m4a',
    title: '우리집 1',
    duration: 3000,
    latitude: 37.549076,
    longitude: 126.945173,
  },
  {
    recordGroupId: 1,
    filename: 'test2.m4a',
    title: '우리집 2',
    duration: 5000,
    latitude: 37.548940,
    longitude: 126.945535,
  },
  {
    recordGroupId: 2,
    filename: 'test3.m4a',
    title: '공덕역 1',
    duration: 3000,
    latitude: 37.5439174744669,
    longitude: 126.95096134487497,
  },
  {
    recordGroupId: 2,
    filename: 'test4.m4a',
    title: '공덕역 2',
    duration: 5000,
    latitude: 37.543710,
    longitude: 126.950843,
  }
];

export default records;