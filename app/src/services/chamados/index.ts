import { api } from '../api';

// Funções que buscam os chamados do usuário registrado.
export async function GetChamados({
  selectedSituation
}: {
  selectedSituation: number | null;
}) {
  const response = await api.get(process.env.NEXT_PUBLIC_API_GET_CHAMADOS_URL, {
    params: {
      situacao: selectedSituation ?? ''
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
