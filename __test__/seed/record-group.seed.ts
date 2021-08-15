import { CreateRecordGroupDto } from '../../src/model/record-group/record-group.dto';

const recordGroups: CreateRecordGroupDto[] = [
  {
    userId: 1,
    category: 'diary',
    title: '우리집',
    location: '서울특별시 마포구 염리동',
    recordType: 'GROUP',
    latitude: 37.549076,
    longitude: 126.945173,
  },
  {
    userId: 1,
    category: 'diary',
    title: '공덕역',
    location: '서울특별시 마포구 공덕동',
    recordType: 'GROUP',
    latitude: 37.5439174744669,
    longitude: 126.95096134487497,
  }
];

export default recordGroups;