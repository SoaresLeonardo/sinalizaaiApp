import { IGetChamadoService } from '@/interfaces/chamados/IGetchamados.service';
import { ChamadoResult } from '../ChamadoResult';

export function ChamadoList({
  chamados
}: {
  chamados: {
    data: IGetChamadoService[];
  };
}) {
  return (
    <>
      {chamados?.data.map((chamadoItem, i) => (
        <ChamadoResult key={i} {...chamadoItem} />
      ))}
    </>
  );
}
