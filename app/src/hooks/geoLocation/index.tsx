import { GeoLocationContext } from '@/contexts/GeoLocation';
import { useContext } from 'react';

export const useGeoLocation = () => {
  const context = useContext(GeoLocationContext);

  return context;
};
