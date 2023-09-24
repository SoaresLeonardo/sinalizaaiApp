'use client';

import { CaretRight, CircleNotch, MapTrifold } from 'phosphor-react';
import { IGetChamadosService } from '@/interfaces/chamados';
import { ChamadosFilter } from '@/components/ChamadosFilter';
import { GetChamados } from '@/services/chamados';
import { FilterProps } from '@/components/ChamadosFilter/types';
import { ChamadoList } from '@/components/ChamadosList';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Link from 'next/link';

const Chamados = () => {
  const [filter, setFilter] = useState<FilterProps | undefined>(undefined);

  const filterObject = {
    params: {
      situacao: filter?.situacao,
      dataInicial: filter?.datas.dataInicial,
      dataFinal: filter?.datas.dataFinal
    }
  };

  const { data: chamadosResponse, isLoading } = useQuery<{
    data: IGetChamadosService[];
  }>(['SinalizaAi.chamados', filter], () => GetChamados(filterObject));

  return (
    <>
      <div className="max-w-7xl mx-auto w-full lg:px-12 p-6 mt-10">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col space-y-10">
            <h1 className="sm:text-2xl text-xl font-bold text-zinc-800">
              Meus chamados
            </h1>
          </div>

          {/*Navigation */}
          <nav className="flex text-gray-700">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li>
                <div className="flex items-center">
                  <Link passHref legacyBehavior href="/user/dashboard">
                    <a className="ml-1 text-sm font-medium flex items-center space-x-1 text-gray-500 hover:text-blue-600 md:ml-2">
                      <MapTrifold size={18} />
                      <span>Dashboard</span>
                    </a>
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <CaretRight size={17} />
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                    Chamados
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Filtro de pesquisa */}
          <ChamadosFilter setFilter={setFilter} />

          {/* Alguns resultados */}

          {/* Carregamento */}
          {isLoading && (
            <>
              <div className="flex items-center justify-center flex-col space-y-3">
                <CircleNotch size={40} className="animate-spin" />
                <span className="text-gray-600">Carregando... aguarde</span>
              </div>
            </>
          )}

          {/* Erro de pesquisa */}
          {!isLoading && filter && !chamadosResponse?.data.length && (
            <>
              <div className="flex items-center justify-center flex-col space-y-3">
                <span className="text-gray-600">
                  Ops... Ouve um erro na pesquisa, Tente novamente.
                </span>
              </div>
            </>
          )}

          {!isLoading && !filter && !chamadosResponse?.data.length && (
            <>
              <div className="flex items-center justify-center flex-col space-y-3">
                <span className="text-gray-600">
                  Nenhum chamado encontrado.
                </span>
              </div>
            </>
          )}

          {/* Lista de chamados(Sucesso) */}
          {!isLoading && chamadosResponse?.data.length !== 0 && (
            <>
              <div className="bg-white p-5 rounded-lg flex flex-col w-full overflow-auto h-auto max-h-96 space-y-5 shadow-md divide-y divide-gray-200">
                {chamadosResponse?.data && (
                  <ChamadoList chamados={chamadosResponse} />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Chamados;
