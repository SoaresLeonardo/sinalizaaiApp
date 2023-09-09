'use client';

import { useAuth } from '@/hooks/auth';
import { useGeoLocation } from '@/hooks/geoLocation';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const Dashboard = () => {
  const { setLatitudes } = useGeoLocation();
  const { isAuthenticated } = useAuth();

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_GOOGLE_API_KEY
  });

  // Posição fixa do mapa sobre a geolocalização da cidade
  const fixedMarkerPosition = {
    lat: -21.6736,
    lng: -50.3238
  };

  // Ao clicar no mapa, será recebido 2 dados(LATITUDE&LONGITUDE) e vão ser devidamentes setados dentro do state de geoInfos
  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    const lat = event.latLng?.lat();
    const lng = event.latLng?.lng();

    setLatitudes({
      geoInfo: {
        latitudeX: lat!,
        latitudeY: lng!
      }
    });
  };

  return (
    <>
      {isAuthenticated && (
        <>
          <div className="w-full h-[50rem]">
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={fixedMarkerPosition}
                zoom={20}
                onClick={handleMapClick}
              ></GoogleMap>
            ) : (
              <></>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
