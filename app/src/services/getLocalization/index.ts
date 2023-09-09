import axios from 'axios';

export async function GetLocalizationAPI({
  lat,
  lng
}: {
  lat: string | number;
  lng: string | number;
}) {
  const response = await axios.get(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
  );
  return response.data;
}
