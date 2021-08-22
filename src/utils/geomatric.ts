export function parsePointToObject(point: string) {
  const numberString = point.slice(6, -1);
  const [latitude, longitude] = numberString.split(' ');
  return {
    latitude: Number(latitude),
    longitude: Number(longitude)
  };
}