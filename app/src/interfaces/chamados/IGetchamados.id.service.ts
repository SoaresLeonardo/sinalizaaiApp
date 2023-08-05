import { SituaçãoProps } from '@/@types';

type HistoricoProps = {
  data: string;
  descricao: string;
  situacao: string;
};

export interface IChamadoByIdService {
  pessoa: string;
  tipoIrregularidade: string;
  situacao: SituaçãoProps;
  dataAbertura: string;
  dataEncerramento: string;
  endereco: string;
  referencia: string;
  pessoaResponsavel: string;
  historico: HistoricoProps[];
}
