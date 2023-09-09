export function CheckGeoInfos({
  lat,
  lng
}: {
  lat: number | string | null;
  lng: number | string | null;
}) {
  if (typeof lat === 'number' && typeof lng === 'number') {
    return true;
  }
  return false;
}
