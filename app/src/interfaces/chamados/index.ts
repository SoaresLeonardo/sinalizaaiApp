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

// Tipagens que serão usadas para mostrar o retorno das informações ao buscar os chamados na API
export interface IGetChamadosService {
  id: number;
  latitude: string;
  longitude: string;
  tipoIrregularidade: string;
  tipoIrregularidadeDescription: string;
  situacao: SituacoesType;
}
// Essas são as tipagens que são usadas; caso o usuário deseja usar algum filtro
export interface IGetChamadoParamsService {
  situacao: number | null | undefined;
  dataInicial: string | undefined;
  dataFinal: string | undefined;
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
