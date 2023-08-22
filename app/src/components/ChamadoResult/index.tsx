import { IGetChamadoService } from '@/interfaces/chamados/IGetchamados.service';
import Link from 'next/link';
import StateChamado from '../StateChamado';
import { IrregularidadeIcon } from '../IrregularidadeIcon';

export function ChamadoResult(chamado: IGetChamadoService) {
  return (
    <>
      <Link href={`chamados/${chamado.id}`}>
        <div className="p-2 cursor-pointer w-full mt-2 bg-white flex items-center space-x-5 transition duration-75">
          <div className="p-3 bg-gray-100 text-indigo-600 rounded-lg">
            <IrregularidadeIcon
              tipoIrregularidade={chamado.tipoIrregularidade}
            />
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="text-zinc-800 font-semibold">
              {chamado.tipoIrregularidadeDescription}
            </span>
            <StateChamado statusSituação={chamado.situacao} />
          </div>
        </div>
      </Link>
    </>
  );
}
