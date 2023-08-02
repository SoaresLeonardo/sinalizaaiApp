'use client';

import { useGeoLocation } from '@/hooks/geoLocation';

export default function DashboardUserPage() {
  // Aqui está dados que vão vir diretamente da ação do usuário sobre o mapa;
  const { latitudes, setLatitudes } = useGeoLocation();
  console.log(latitudes);

  // Recebendo os dados e inserindo eles dentro do estado que está no contexto global;
  const handleClick = () => {
    //Dados X e Y
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
    <div className="max-w-7xl mx-auto w-full lg:px-12 p-6 mt-10">
      <div className="flex flex-col gap-10">
        <div className="flex sm:flex-row flex-col sm:items-center justify-between sm:space-y-0 space-y-4">
          <div className="flex flex-col space-y-1">
            <h1 className="sm:text-3xl text-xl font-semibold text-zinc-700 left-28 italic">
              Mapa da cidade
            </h1>
            <p className="text-base text-gray-600">
              Selecione o local que deseja abrir um chamado.
            </p>
          </div>
          {/* Dados da latitude exibidos em tela quando estiverem preechidos */}
          {latitudes.geoInfo.latitudeX && latitudes.geoInfo.latitudeY && (
            <div className="flex flex-col space-y-3">
              <span className="text-gray-700">
                <strong className="text-zinc-900">X:</strong>
                {latitudes.geoInfo.latitudeX
                  ? latitudes.geoInfo.latitudeX
                  : '00000000000'}
              </span>
              <span className="text-gray-700">
                <strong className="text-zinc-900">Y:</strong>
                {latitudes.geoInfo.latitudeY
                  ? latitudes.geoInfo.latitudeY
                  : '00000000000'}
              </span>
            </div>
          )}
        </div>
        <div
          className="bg-gray-300 w-full h-64 rounded-lg cursor-pointer"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
