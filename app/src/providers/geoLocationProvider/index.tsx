import { GeoLocationContext } from '@/contexts/GeoLocation';
import { GeografInfos } from '@/interfaces/IGeoLocationContext';
import { ReactNode, useState } from 'react';

export const GeoLocationProvider = ({ children }: { children: ReactNode }) => {
  const [latitudes, setLatitudes] = useState<GeografInfos>({
    geoInfo: {
      latitudeX: null,
      latitudeY: null
    }
  });
  return (
    <GeoLocationContext.Provider value={{ latitudes, setLatitudes }}>
      {children}
    </GeoLocationContext.Provider>
  );
};
