import { FilterSubmit, Props } from './types';
import { optionsSituacao } from '@/data/options/op.situacao';
import { MagnifyingGlass } from 'phosphor-react';
import { OptionProps } from '@/data/options/op.type';
import { formatFunc } from '@/Utils/dateFormat';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Combox from '../Combox';
import Button from '../Button';

export function ChamadosFilter({ setFilter }: Props) {
  // React hook-form
  const { register, handleSubmit } = useForm<FilterSubmit>();

  // Item selecionado na combox
  const [comboxSelected, setComboxSelected] = useState<{
    option: OptionProps;
  } | null>(null);

  // Ação do submit onde eu vou setar  os dados do filtro dentro do state de Filtro
  const handleFilterChamados = (data: FilterSubmit) => {
    const { dataInicial, dataFinal } = data;

    // Fazendo uma validação para verificar se algum dado de filtro foi setado
    const selectedItemValidation =
      dataInicial || dataFinal || comboxSelected ? true : false;

    if (selectedItemValidation) {
      setFilter((prevFilter) => ({
        ...prevFilter,
        datas: {
          dataInicial: formatFunc(dataInicial),
          dataFinal: formatFunc(dataFinal)
        },
        situacao: comboxSelected?.option.value
      }));
    }
  };
  return (
    <form
      onSubmit={handleSubmit(handleFilterChamados)}
      className="bg-white p-5 rounded-lg shadow-md"
    >
      <div className="flex items-center lg:flex-row flex-col lg:justify-between justify-center gap-4">
        <div className="flex lg:flex-row flex-col items-center flex-wrap gap-4 lg:w-auto w-full">
          <input
            type="date"
            {...register('dataInicial')}
            className="bg-white p-3 lg:w-auto w-full rounded-lg outline-none text-zinc-800 border border-[#08122515] text-sm"
          />
          <input
            type="date"
            {...register('dataFinal')}
            className="bg-white p-3 rounded-lg lg:w-auto w-full outline-none text-zinc-800 border border-[#08122515] text-sm"
          />
          <div className="w-full">
            <Combox
              selected={comboxSelected?.option}
              setSelected={setComboxSelected}
              options={optionsSituacao}
              static
            />
          </div>
        </div>
        <Button type="submit" className="space-x-1">
          <MagnifyingGlass size={20} />
          <span>Pesquisar</span>
        </Button>
      </div>
    </form>
  );
}
