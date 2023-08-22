'use client';

import { ChamadosFilter } from './ChamadosFilter';
import { ChamadosListSkeleton } from './Skeletons/ChamadoList';
import { IGetChamadoService } from '@/interfaces/chamados/IGetchamados.service';
import { GetChamados } from '@/services/chamados';
import { FilterProps } from './ChamadosFilter/types';
import { ChamadoList } from './ChamadosList';
import { useQuery } from 'react-query';
import { useState } from 'react';
import chamadosNotFound from '../../public/chamadosNotFound.svg';
import Image from 'next/image';

export function Chamados() {
  // Dados do filtro de pesquisa
  const [filter, setFilter] = useState<FilterProps | undefined>(undefined);

  // Query - API; passando os params da req
  const { data: chamadosResponse, isLoading } = useQuery<{
    data: IGetChamadoService[];
  }>(['SinalizaAi.chamados', filter], () =>
    GetChamados({
      params: {
        situacao: filter?.situacao,
        dataInicial: filter?.datas.dataInicial,
        dataFinal: filter?.datas.dataFinal
      }
    })
  );

  return (
    <>
      <div className="max-w-7xl mx-auto w-full lg:px-12 p-6 mt-10">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col space-y-10">
            <h1 className="sm:text-2xl text-xl font-bold text-zinc-800">
              Meus chamados
            </h1>
          </div>
          {/* Filtro de pesquisa */}
          <ChamadosFilter setFilter={setFilter} />
          {/*Lista de chamados */}
          <div className="bg-white p-5 rounded-lg flex flex-col w-full overflow-auto h-auto max-h-96 space-y-5 shadow-sm divide-y divide-gray-200">
            {isLoading && <ChamadosListSkeleton />}
            {!isLoading && filter && !chamadosResponse?.data.length && (
              <>
                <div className="flex items-center justify-center flex-col gap-6">
                  <Image
                    src={chamadosNotFound}
                    alt={`Chamado não encontrado!`}
                    width={240}
                    height={240}
                  />
                  <div className="flex flex-col items-center justify-center text-center">
                    <h1 className="text-xl font-bold">Ops...</h1>
                    <p className="text-gray-700">
                      Algo deu errado na sua pesquisa! Por favor tente
                      novamente.
                    </p>
                  </div>
                </div>
              </>
            )}
            {!isLoading && (
              <>
                {chamadosResponse?.data && (
                  <ChamadoList chamados={chamadosResponse} />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
