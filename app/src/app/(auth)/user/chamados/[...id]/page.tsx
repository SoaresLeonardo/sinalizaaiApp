import ChamadosById from '@/templates/user/auth/chamadoId';

type PageProps = {
  params: {
    id: number;
  };
};

export default function GetChamadoByIdPage({ params }: PageProps) {
  return <ChamadosById params={params} />;
}
