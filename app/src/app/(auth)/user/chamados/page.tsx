'use client';

import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { Car, CaretDown, CaretUp } from 'phosphor-react';
import { Dispatch, SetStateAction, useState } from 'react';
import { api } from '@/services/api';
import { z } from 'zod';
import Link from 'next/link';

const schema = z.object({
  dataInicial: z.coerce.date(),
  dataFinal: z.coerce.date()
});

export type FormProps = z.infer<typeof schema>;

type ChamadoProps = {
  id: number;
  latitude: number;
  longitude: number;
  tipoIrregularidade: number;
  tipoIrregularidadeDescription: string;
  situação: string;
};

type DataFilterProps = {
  dataInicial: Date;
  dataFinal: Date;
};

type OptionProps = {
  text: string;
  value: number | null;
};

export default function UserChamados() {
  // Esse estado armazena das datas que o usuário deseja buscar por chamado.

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dataFilter, setDataFilter] = useState<null | DataFilterProps>(null);

  // Esse Estado armazena a situação que o usuário quer buscar dos chamados, inicialmente eu mando que ele não quer nada para buscar todos os chamados
  const [selected, setSelected] = useState<{ option: OptionProps }>({
    option: {
      text: 'Nenhuma',
      value: null
    }
  });
  // Usando o React query para fazer a requisição na API.
  // Aqui eu recolho o data(as informações da API) através da variável DATA, mas logo renomeio para "chamadosList"
  // Busco minha função refetch que uso para refazer a requisição caso o usuário use algum filtro.
  // E também uso o estado de IsLoading para evitar possivéis errors.
  const {
    data: chamadosList,
    refetch,
    isLoading
  } = useQuery<{ data: ChamadoProps[] }>('chamados', async () => {
    const response = await api.get(`api/v1/chamado`, {
      params: {
        situacao: selected?.option.value ? selected.option.value : ''
      }
    });
    return response.data;
  });

  // Nessa função eu busco os dados expecificadamente dos input de date para poder filtrar os chamados por data.
  const handleFilterChamados = (data: FormProps) => {
    setDataFilter({ dataInicial: data.dataInicial, dataFinal: data.dataFinal });
  };

  // React hook form - Onde eu recolho os dados
  const { handleSubmit, register } = useForm<FormProps>();

  return (
    <div className="max-w-7xl mx-auto w-full lg:px-12 p-6 mt-10">
      <div className="flex flex-col space-y-10">
        <h1 className="sm:text-2xl text-xl font-semibold text-zinc-100 left-28 italic">
          Chamados em aberto
        </h1>
      </div>
      {/* Filtro de listagem */}
      <div className="mt-12">
        <form onSubmit={handleSubmit(handleFilterChamados)}>
          <div className="flex items-center gap-6">
            {/* Input de data Inicial */}
            <div className="flex items-center space-x-2 text-zinc-400">
              <label htmlFor="DataInicial" className="text-sm cursor-pointer">
                Data inicial:
              </label>
              <input
                type="date"
                id="DataInicial"
                className="bg-[#242c37] p-3 rounded-sm outline-none text-zinc-50 border border-gray-600 text-sm"
                {...register('dataInicial')}
              />
            </div>
            {/* Input de data final */}
            <div className="flex items-center space-x-2 text-zinc-400">
              <label htmlFor="DataFinal" className="text-sm cursor-pointer">
                Data final:
              </label>
              <input
                type="date"
                id="DataFinal"
                className="bg-[#242c37] p-3 rounded-sm outline-none text-zinc-50 border border-gray-600 text-sm"
                {...register('dataFinal')}
              />
            </div>
            {/*Componente de Combox com os tipos das situações dos chamados*/}
            <div className="flex items-center space-x-2 text-zinc-400">
              <label htmlFor="" className="text-sm cursor-pointer">
                Situação:
              </label>
              {/*Componente */}
              <ComboxSelect
                selected={selected?.option}
                setSelected={setSelected}
              />
            </div>

            {/*Este botão é o responsavél por fazer a requisição novamente na API - e trazer os novos dados com base no filtro! */}
            <button
              className="bg-[#7E3AF2] text-zinc-50 p-3 rounded-sm text-sm w-24"
              type="submit"
              onClick={() => refetch()}
            >
              Filtrar
            </button>
          </div>
        </form>
      </div>

      {/* Contador de resultados */}
      <ChamadosListCounter
        qtd={chamadosList?.data.length ? chamadosList?.data.length : 0}
      />

      {/*Lista de chamados */}
      <div className="flex flex-col mt-16 space-y-8 lg:max-w-3xl w-full">
        {isLoading && <span>Carregando seus chamados.</span>}

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
const ChamadosListCounter = ({ qtd }: { qtd: number }) => {
  return (
    <>
      <div className="mt-12">
        <span className="text-zinc-400">
          Resultados:
          <strong className="text-[#7E3AF2]">{qtd}</strong>
        </span>
      </div>
    </>
  );
};

// Componente que uso para renderizar as informações do chamado & também redireciona para a rota user/chamado/IDCHAMADO
const ChamadosResult = (chamado: ChamadoProps) => {
  return (
    <>
      <Link href={`user/chamados/${chamado.id}`}>
        <div className="p-5 rounded-xl shadow-md cursor-pointer w-full  border-[#242c37] border-2 hover:border-[#7E3AF2] flex items-center space-x-5 transition duration-75">
          <div className="p-3 bg-[#242c37] text-[#7E3AF2] rounded-md">
            <Car size={30} />
          </div>
          <span className="text-zinc-100 text-lg">
            {chamado.tipoIrregularidadeDescription}
          </span>
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
