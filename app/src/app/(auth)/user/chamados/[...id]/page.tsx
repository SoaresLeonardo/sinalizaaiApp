import { ChamadosDetails } from '@/components/_ChamadosDetails';

type PageProps = {
  params: {
    id: number;
  };
};

export default function GetChamadoId({ params }: PageProps) {
  return <ChamadosDetails params={params} />;
}
