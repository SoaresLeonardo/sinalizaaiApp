import { SituaçãoProps } from '@/@types';

export interface IDataFilterProps {
  dataInicial: string | null;
  dataFinal: string | null;
}

export interface IGetChamadoService {
  id: number;
  latitude: number;
  longitude: number;
  tipoIrregularidade: number;
  tipoIrregularidadeDescription: string;
  situacao: SituaçãoProps;
}
