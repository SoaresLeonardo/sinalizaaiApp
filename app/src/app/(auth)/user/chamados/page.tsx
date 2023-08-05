'use client';

import { IGetChamadoService } from '@/interfaces/chamados/IGetchamados.service';
import { Car, CaretDown, CaretUp } from 'phosphor-react';
import { Dispatch, SetStateAction, useState } from 'react';
import { GetChamados } from '@/services/chamados';
import { useQuery } from 'react-query';
import StateChamado from '@/components/StateChamado';
import Link from 'next/link';

type OptionProps = {
  text: string;
  value: number | null;
};

export default function UserChamados() {
  // Estes são meus states que armazenam os dados dos filtros que o usuário pode aplicar na busca.
  const [selected, setSelected] = useState<{ option: OptionProps }>({
    option: {
      text: 'Nenhuma',
      value: null
    }
  });
  // Este é a query que utilizo para buscar os chamados, e o tipo da situação que cada um se encontra no momento.
  const { data: chamadosList, isLoading } = useQuery<{
    data: IGetChamadoService[];
  }>(['chamados', { params: selected.option.value }], () =>
    GetChamados({ selectedSituation: selected.option.value })
  );

  return (
    <div className="max-w-7xl mx-auto w-full lg:px-12 p-6 mt-10">
      <div className="flex flex-col space-y-10">
        <h1 className="sm:text-2xl text-xl font-semibold text-zinc-100 left-28 italic">
          Meus chamados
        </h1>
      </div>
      {/* Filtro de pesquisa */}
      <div className="mt-12 lg:max-w-full max-w-lg">
        <div className="flex lg:flex-row flex-col lg:items-center gap-6">
          {/* Input de data Inicial */}
          <div className="flex lg:flex-row flex-col lg:items-center lg:space-x-2 text-zinc-400">
            <label htmlFor="DataInicial" className="text-sm cursor-pointer">
              Data inicial:
            </label>
            <input
              type="date"
              id="DataInicial"
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
              className="bg-[#242c37] p-3 rounded-sm outline-none text-zinc-50 border border-gray-600 text-sm"
            />
          </div>
          {/*Componente de Combox com os tipos das situações dos chamados*/}
          <div className="flex lg:flex-row flex-col lg:items-center lg:space-x-2 text-zinc-400">
            <label className="text-sm cursor-pointer">Situação:</label>
            {/*Componente */}
            <ComboxSelect
              selected={selected?.option}
              setSelected={setSelected}
            />
          </div>
        </div>
      </div>

      {/* Contador de resultados */}
      <ChamadosListCounter qtd={chamadosList?.data.length} />

      {/*Lista de chamados */}
      <div className="flex flex-col mt-11 space-y-8 lg:max-w-3xl w-full">
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
          <span className="text-zinc-400">
            Resultados:
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

// Componente de Combox
const ComboxSelect = ({
  selected,
  setSelected
}: {
  selected: OptionProps | null;
  setSelected: Dispatch<
    SetStateAction<{
      option: OptionProps;
    }>
  >;
}) => {
  const [selectIsOpen, setSelectIsOpen] = useState(false);
  const hadleSelectIsOpen = () => {
    setSelectIsOpen(!selectIsOpen);
  };
  const options: OptionProps[] = [
    {
      text: 'Aberto',
      value: 0
    },
    {
      text: 'Analise',
      value: 1
    },
    {
      text: 'Execução',
      value: 2
    },
    {
      text: 'Bloqueado',
      value: 3
    },
    {
      text: 'Finalizado',
      value: 4
    },
    {
      text: 'Nenhuma',
      value: null
    }
  ];
  return (
    <>
      <div className="relative">
        <button
          className="bg-[#242c37] p-3 rounded-sm outline-none text-zinc-50 border border-gray-600 w-44 flex items-center justify-between text-sm"
          onClick={hadleSelectIsOpen}
        >
          <span>{selected?.text ? selected.text : 'Irregularidade'}</span>
          {selectIsOpen ? <CaretUp size={15} /> : <CaretDown size={15} />}
        </button>
        {selectIsOpen && (
          <div className="absolute bg-[#242c37] p-3 rounded-sm outline-none text-zinc-50 border border-gray-600 w-44 mt-2">
            {options.map((op, i) => (
              <span
                key={i}
                onClick={() => {
                  setSelected({ option: op });
                  setSelectIsOpen(false);
                }}
                className="block p-2 hover:bg-[#333c49] cursor-pointer rounded-sm text-sm"
              >
                {op.text}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
