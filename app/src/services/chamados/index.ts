import { IGetChamadoParamsService } from '@/interfaces/chamados';
import { api } from '../api';

type Teste = {
  tipoIrregularidade: number;
  endereco: string;
  latitude: string;
  longitude: string;
  referencia: string;
};

type UpdateChamado = {
  motivo: string;
  situacao: number;
  id: number;
};

// Funções que buscam os chamados do usuário registrado.
export async function GetChamados({
  params
}: {
  params: IGetChamadoParamsService | undefined;
}) {
  const response = await api.get(process.env.NEXT_PUBLIC_API_GET_CHAMADOS_URL, {
    params: params
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

export async function UpdateChamado(data: UpdateChamado) {
  const response = await api.put(
    `${process.env.NEXT_PUBLIC_API_GET_CHAMADOS_URL}/${data.id}/${data.situacao}`,
    data,
    {
      params: {
        motivo: data.motivo
      }
    }
  );

  return response.data;
}
