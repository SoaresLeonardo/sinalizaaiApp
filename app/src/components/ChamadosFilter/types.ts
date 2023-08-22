import { Dispatch, SetStateAction } from 'react';

export type FilterProps = {
  datas: {
    dataInicial: string;
    dataFinal: string;
  };
  situacao?: number | null;
};

export type FilterSubmit = {
  dataInicial: string;
  dataFinal: string;
};

export type Props = {
  setFilter: Dispatch<SetStateAction<FilterProps | undefined>>;
};
