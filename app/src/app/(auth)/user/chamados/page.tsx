'use client';

import { IGetChamadoService } from '@/interfaces/chamados/IGetchamados.service';
import { optionsSituacao } from '@/data/options/op.situacao';
import { GetChamados } from '@/services/chamados';
import { OptionProps } from '@/data/options/op.type';
import { formatFunc } from '@/Utils/dateFormat';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useForm } from 'react-hook-form';
import { Car } from 'phosphor-react';
import imageNotChamados from '../../../../../public/nochamados.svg';
import StateChamado from '@/components/StateChamado';
import Button from '@/components/Button';
import Combox from '@/components/Combox';
import Image from 'next/image';
import Link from 'next/link';

type DataFilterProps = {
  dataInicial: string;
  dataFinal: string;
};

export default function UserChamados() {
  // Estes são meus states que armazenam os dados dos filtros que o usuário pode aplicar na busca.
  const [data, setData] = useState<{ datas: DataFilterProps } | null>(null);
  const [selected, setSelected] = useState<{ option: OptionProps }>({
    option: {
      text: 'Nenhuma',
      value: null
    }
  });
  const [selectedValue, setSelectedValue] = useState<null | number>(null);

  // Este é a query que utilizo para buscar os chamados, e o tipo da situação que cada um se encontra no momento.
  const {
    data: chamadosList,
    isLoading,
    refetch
  } = useQuery<{
    data: IGetChamadoService[];
  }>(
    ['chamados', data?.datas.dataInicial, data?.datas.dataFinal, selectedValue],
    () =>
      GetChamados({
        selectedSituation: selectedValue,
        dataInicial: data?.datas.dataInicial,
        dataFinal: data?.datas.dataFinal
      })
  );

  const { register, handleSubmit } = useForm({
    defaultValues: {
      dataInicial: '',
      dataFinal: ''
    }
  });

  const handleFilterData = ({
    dataInicial,
    dataFinal
  }: {
    dataInicial: string;
    dataFinal: string;
  }) => {
    setData({
      datas: {
        dataInicial: formatFunc(dataInicial),
        dataFinal: formatFunc(dataFinal)
      }
    });
    setSelectedValue(selected.option.value);
  };

  return (
    <div className="max-w-7xl mx-auto w-full lg:px-12 p-6 mt-10">
      <div className="flex flex-col space-y-10">
        <h1 className="sm:text-2xl text-xl font-semibold text-zinc-100 left-28 italic">
          Meus chamados
        </h1>
      </div>
      {/* Filtro de pesquisa */}
      <div className="mt-12 lg:max-w-full max-w-lg">
        <form onSubmit={handleSubmit(handleFilterData)}>
          <div className="flex lg:flex-row flex-col lg:items-center gap-6">
            {/* Input de data Inicial */}
            <div className="flex lg:flex-row flex-col lg:items-center lg:space-x-2 text-zinc-400">
              <label htmlFor="DataInicial" className="text-sm cursor-pointer">
                Data inicial:
              </label>
              <input
                type="date"
                id="DataInicial"
                {...register('dataInicial')}
                className="bg-[#242c37] p-3 rounded-sm outline-none text-zinc-50 border border-gray-600 text-sm"
              />
            </div>
            {/* Input de data final */}
            <div className="flex lg:flex-row flex-col lg:items-center lg:space-x-2 text-zinc-400">
              <label htmlFor="DataFinal" className="text-sm cursor-pointer">
                Data final:
              </label>
              <input
                type="date"
                id="DataFinal"
                {...register('dataFinal')}
                className="bg-[#242c37] p-3 rounded-sm outline-none text-zinc-50 border border-gray-600 text-sm"
              />
            </div>
            {/*Componente de Combox com os tipos das situações dos chamados*/}
            <div className="flex lg:flex-row flex-col lg:items-center lg:space-x-2 text-zinc-400">
              <label className="text-sm cursor-pointer">Situação:</label>
              {/*Componente */}
              <Combox
                options={optionsSituacao}
                selected={selected.option}
                setSelected={setSelected}
                static
              />
            </div>
            <Button onClick={() => refetch()}>Aplicar</Button>
          </div>
        </form>
      </div>

      {/* Contador de resultados */}
      <ChamadosListCounter
        qtd={chamadosList?.data.length ? chamadosList?.data.length : undefined}
      />

      {/*Lista de chamados */}
      <div className="flex flex-col mt-11 space-y-8 lg:max-w-4xl w-full">
        {isLoading && (
          <>
            <div className="p-5 rounded-xl shadow-md cursor-pointer w-full border-[#242c37] border-2 flex items-center space-x-5 transition duration-75 animate-pulse">
              <div className="p-3 bg-[#242c37] rounded-md">
                <div className="h-8 w-8" />
              </div>
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            </div>
            <div className="p-5 rounded-xl shadow-md cursor-pointer w-full border-[#242c37] border-2 flex items-center space-x-5 transition duration-75 animate-pulse">
              <div className="p-3 bg-[#242c37] rounded-md">
                <div className="h-8 w-8" />
              </div>
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            </div>
            <div className="p-5 rounded-xl shadow-md cursor-pointer w-full border-[#242c37] border-2 flex items-center space-x-5 transition duration-75 animate-pulse">
              <div className="p-3 bg-[#242c37] rounded-md">
                <div className="h-8 w-8" />
              </div>
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            </div>
          </>
        )}

        {/*Caso o estado de loading seja diferente de verdadeiro eu exibo a lista */}
        {!isLoading && (
          <>
            {chamadosList?.data.map((chamado) => (
              <ChamadosResult key={chamado.id} {...chamado} />
            ))}
          </>
        )}

        {/*Caso não tiver uma resposta eu exibo essa mensagem */}
        {!chamadosList?.data.length && (
          <>
            <div className="flex flex-col items-center gap-11 p-2">
              <Image
                src={imageNotChamados}
                alt="Chamados não encontrado"
                width={230}
                height={230}
              />
              <span className="text-zinc-50">Não a chamados por aqui.</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Componente que uso apenas para receber um número que indica a quantidade de chamados que foi retornado da requisição e mostro em tela
const ChamadosListCounter = ({ qtd }: { qtd: number | undefined }) => {
  return (
    <>
      {!qtd && (
        <div className="mt-12 animate-pulse">
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-28"></div>
        </div>
      )}
      {qtd && (
        <div className="mt-12">
          <span className="text-zinc-400 space-x-1">
            <span>Resultado:</span>
            <strong className="text-[#7E3AF2]">{qtd}</strong>
          </span>
        </div>
      )}
    </>
  );
};

// Componente que uso para renderizar as informações do chamado & também redireciona para a rota user/chamado/IDCHAMADO
const ChamadosResult = (chamado: IGetChamadoService) => {
  return (
    <>
      <Link href={`chamados/${chamado.id}`}>
        <div className="p-5 rounded-xl shadow-md cursor-pointer w-full  border-[#242c37] border-2 hover:border-[#7E3AF2] flex items-center space-x-5 transition duration-75">
          <div className="p-3 bg-[#242c37] text-[#7E3AF2] rounded-md">
            <Car size={30} />
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="text-zinc-100 text-base">
              {chamado.tipoIrregularidadeDescription}
            </span>
            <StateChamado statusSituação={chamado.situacao} />
          </div>
        </div>
      </Link>
    </>
  );
};
