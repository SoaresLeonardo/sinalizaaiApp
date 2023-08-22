import { SituaçãoProps } from '@/@types';

export interface IDataFilterProps {
  dataInicial: string | null;
  dataFinal: string | null;
}

export interface IGetChamadoService {
  id: number;
  latitude: string;
  longitude: string;
  tipoIrregularidade: string;
  tipoIrregularidadeDescription: string;
  situacao: SituaçãoProps;
}
