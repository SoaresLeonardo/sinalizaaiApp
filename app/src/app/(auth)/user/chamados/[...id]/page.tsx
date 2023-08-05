'use client';

import { SituaçãoProps } from '@/components/StateChamado';
import { useQuery } from 'react-query';
import { GetChamadosByID } from '@/services/chamados';
import { IChamadoByIdService } from '@/interfaces/chamados/IGetchamados.id.service';
import notFoundChamados from '../../../../../../public/notfoundChamados.svg';
import StateChamadoTextBox from '@/components/StateChamado/StateChamadoTextBox';
import ChamadoDetailsSkeleton from '@/components/Skeletons/ChamadoDetails';
import Image from 'next/image';
import Link from 'next/link';

type PageProps = {
  params: {
    id: number;
  };
};

export default function GetChamadoId({ params }: PageProps) {
  const { data: chamadosDetails, isLoading } = useQuery<{
    data: IChamadoByIdService;
  }>(['detalhesChamado', { params: params.id }], () =>
    GetChamadosByID({ id: params.id })
  );

  if (!isLoading) {
    if (!chamadosDetails?.data) {
      return (
        <>
          <div className="max-w-7xl mx-auto w-full lg:px-12 p-6 mt-10">
            <div className="flex flex-col space-y-10 items-center justify-center">
              <Image
                src={notFoundChamados}
                alt={`Chamado com o ${params.id} não encontrado`}
                width={220}
                height={220}
              />

              <h1 className="text-zinc-50 text-lg">
                Ops, ouve um erro ao buscar este chamado.
              </h1>
              <Link href="/chamados" passHref legacyBehavior>
                <a className="text-[#7e3af2] hover:underline">
                  Voltar para chamados
                </a>
              </Link>
            </div>
          </div>
        </>
      );
    }
  }

  return (
    <div className="max-w-7xl mx-auto w-full lg:px-12 p-6 mt-10">
      <div className="flex flex-col space-y-10">
        <h1 className="sm:text-2xl text-xl font-semibold text-zinc-100 left-28 italic">
          Mais Detalhes
        </h1>
      </div>
      <div className="flex flex-col">
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-500">
            Aqui está mais detalhes referentes ao chamado.
          </h3>
        </div>
        {isLoading && <ChamadoDetailsSkeleton />}
        {!isLoading && (
          <>
            <div className="mt-6 border-t border-t-gray-800 border-gray-100">
              <dl className="divide-y divide-gray-800">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-zinc-300">
                    Nome do usuário
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                    {chamadosDetails?.data.pessoa}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-zinc-300">
                    Irregularidade
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                    {chamadosDetails?.data.tipoIrregularidade}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-zinc-300">
                    Situação
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                    <StateChamadoTextBox
                      statusSituação={chamadosDetails!.data.situacao}
                    />
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-zinc-300">
                    Data de abertura
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                    {chamadosDetails?.data.dataAbertura}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-zinc-300">
                    Data de encerramento
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                    {chamadosDetails?.data.dataEncerramento
                      ? chamadosDetails.data.dataEncerramento
                      : 'Não definida'}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-zinc-300">
                    Rua Referência
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                    {chamadosDetails?.data.referencia
                      ? chamadosDetails?.data.referencia
                      : 'Nenhuma'}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-zinc-300">
                    Responsavél
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                    {chamadosDetails?.data.pessoaResponsavel
                      ? chamadosDetails.data.pessoaResponsavel
                      : 'Nenhum'}
                  </dd>
                </div>
              </dl>
            </div>
          </>
        )}

        {!isLoading && (
          <>
            <div className="flex flex-col space-y-10 mt-11">
              <h1 className="sm:text-2xl text-xl font-semibold text-zinc-100 left-28 italic">
                Histórico
              </h1>
            </div>
            <div className="mt-11">
              <div>
                <table className="w-full">
                  <thead className="bg-[#242c37] border-b-2 border-gray-700">
                    <tr>
                      <th className="font-semibold p-2 text-zinc-300 text-left">
                        data
                      </th>
                      <th className="font-semibold p-2 text-zinc-300 text-left">
                        Descrição
                      </th>
                      <th className="font-semibold p-2 text-zinc-300 text-left">
                        Situação
                      </th>
                    </tr>
                  </thead>
                  <tbody className="border border-gray-800 divide-y divide-gray-800">
                    {chamadosDetails?.data.historico.map((stateChamado, i) => (
                      <tr key={i}>
                        <td className="p-2 text-sm text-gray-400">
                          {stateChamado.data}
                        </td>
                        <td className="p-2 text-sm text-gray-400">
                          {stateChamado.descricao}
                        </td>
                        <td className="p-2 text-sm text-gray-400">
                          <StateChamadoTextBox
                            statusSituação={
                              stateChamado.situacao as SituaçãoProps
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
