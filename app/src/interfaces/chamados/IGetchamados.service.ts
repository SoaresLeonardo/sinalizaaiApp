import { SituaçãoProps } from '@/@types';

export type DataFilterProps = {
  dataInicial: Date;
  dataFinal: Date;
};

export interface IGetChamadoService {
  id: number;
  latitude: number;
  longitude: number;
  tipoIrregularidade: number;
  tipoIrregularidadeDescription: string;
  situacao: SituaçãoProps;
}
