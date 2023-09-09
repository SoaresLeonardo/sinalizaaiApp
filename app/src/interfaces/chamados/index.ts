type SituacoesType =
  | 'Aberto'
  | 'Análise'
  | 'Execução'
  | 'Bloqueado'
  | 'Finalizado';

type HistoricoProps = {
  data: string;
  descricao: string;
  situacao: string;
};

export interface IGetChamadosService {
  id: number;
  latitude: string;
  longitude: string;
  tipoIrregularidade: string;
  tipoIrregularidadeDescription: string;
  situacao: SituacoesType;
}

export interface IChamadoByIdService {
  pessoa: string;
  tipoIrregularidade: string;
  situacao: SituacoesType;
  dataAbertura: string;
  dataEncerramento: string;
  endereco: string;
  referencia: string;
  pessoaResponsavel: string;
  historico: HistoricoProps[];
}
