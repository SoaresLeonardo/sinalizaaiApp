'use client';

import { useGeoLocation } from '@/hooks/geoLocation';

export default function DashboardUserPage() {
  const { latitudes, setLatitudes } = useGeoLocation();
  console.log(latitudes);
  const handleClick = () => {
    const latitudeX = Math.random();
    const latitudeY = Math.random();

    setLatitudes({
      geoInfo: {
        latitudeX,
        latitudeY
      }
    });
  };
  return (
    <div className="max-w-7xl w-full mx-auto">
      <div className="flex items-center justify-center text-zinc-500">
        <div
          className="bg-gray-300 w-2/4 h-96 rounded-md"
          onClick={handleClick}
        ></div>
      </div>
    </div>
  );
}
