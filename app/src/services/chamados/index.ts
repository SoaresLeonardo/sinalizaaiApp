import { api } from '../api';

type Teste = {
  tipoIrregularidade: number;
  endereco: string;
  latitude: string;
  longitude: string;
  referencia: string;
};

// Funções que buscam os chamados do usuário registrado.
export async function GetChamados({
  selectedSituation,
  dataInicial,
  dataFinal
}: {
  selectedSituation: number | null;
  dataInicial?: string;
  dataFinal?: string;
}) {
  const response = await api.get(process.env.NEXT_PUBLIC_API_GET_CHAMADOS_URL, {
    params: {
      situacao: selectedSituation ?? '',
      dataInicial: dataInicial ?? '',
      dataFinal: dataFinal ?? ''
    }
  });

  return response.data;
}
export async function GetChamadosByID({ id }: { id: number }) {
  const response = await api.get(
    `${process.env.NEXT_PUBLIC_API_GET_CHAMADOS_URL}/${id}`
  );

  return response.data;
}

export async function PostChamado(data: Teste) {
  const response = await api.post(
    process.env.NEXT_PUBLIC_API_GET_CHAMADOS_URL,
    data
  );

  return response.data;
}
