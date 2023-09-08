'use client';

import { useGeoLocation } from '@/hooks/geoLocation';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

export function DashboardMap() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBSvNmFAj3xvxn-AC1RqWGDRUOfvi6eutw'
  });

  const fixedMarkerPosition = {
    lat: -21.6736,
    lng: -50.3238
  };

  const { latitudes, setLatitudes } = useGeoLocation();

  const handleMapClick = (event: any) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    setLatitudes({
      geoInfo: {
        latitudeX: lat,
        latitudeY: lng
      }
    });
  };

  console.log(latitudes);

  return (
    <>
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
    </>
  );
}
// AIzaSyBSvNmFAj3xvxn-AC1RqWGDRUOfvi6eutw
