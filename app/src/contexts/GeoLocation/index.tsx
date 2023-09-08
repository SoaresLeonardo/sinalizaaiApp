import { GeografInfos, IContext } from '@/interfaces/IGeoLocationContext';
import { ReactNode, createContext, useState } from 'react';

export const GeoLocationContext = createContext<IContext>({} as IContext);

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
