'use client';

import { IChamadoByIdService } from '@/interfaces/chamados/IGetchamados.id.service';
import { GetChamadosByID } from '@/services/chamados';
import { SituaçãoProps } from '@/@types';
import { useQuery } from 'react-query';
import StateChamadoTextBox from './StateChamado/StateChamadoTextBox';
import ChamadoDetailsSkeleton from './Skeletons/ChamadoDetails';
import { useAuth } from '@/hooks/auth';
import Button from './Button';

import { UserAdminSettings } from './Layout/Admin';
import { useState } from 'react';

import updateChamadoImage from '../../public/statusUpdate.svg';
import Image from 'next/image';

type Props = {
  params: {
    id: number;
  };
};

export function ChamadosDetails({ params }: Props) {
  const { user } = useAuth();

  //Modal do administrador
  const [openModal, setOpenModal] = useState(false);

  // Query que busca os detalhes&&Historico do chamado;
  const { data: chamadosDetails, isLoading } = useQuery<{
    data: IChamadoByIdService;
  }>(['SinalizaAi.chamadoById', { params: params.id }], () =>
    GetChamadosByID({ id: params.id })
  );

  const permitionAndStateeValidation =
    user &&
    user.role === 'Administrador' &&
    chamadosDetails?.data.situacao !== 'Finalizado'
      ? true
      : false;

  return (
    <>
      <div className="max-w-7xl mx-auto w-full lg:px-4 p-2 mt-10">
        <div className="p-5 rounded-lg overflow-auto h-96 bg-white">
          <div className="flex flex-col">
            {isLoading && <ChamadoDetailsSkeleton />}
            {!isLoading && (
              <>
                <div className="p-5 mt-4">
                  <div className="border-t border-t-[#E4E9EB]">
                    <dl className="divide-y divide-[#E4E9EB]">
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-zinc-800">
                          Nome do usuário
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-600 sm:col-span-2 sm:mt-0">
                          {chamadosDetails?.data.pessoa}
                        </dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-zinc-800">
                          Irregularidade
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-600 sm:col-span-2 sm:mt-0">
                          {chamadosDetails?.data.tipoIrregularidade}
                        </dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-zinc-800">
                          Situação
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-600 sm:col-span-2 sm:mt-0">
                          <StateChamadoTextBox
                            statusSituação={chamadosDetails!.data.situacao}
                          />
                        </dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-zinc-800">
                          Data de abertura
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-600 sm:col-span-2 sm:mt-0">
                          {chamadosDetails?.data.dataAbertura}
                        </dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-zinc-800">
                          Data de encerramento
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-600 sm:col-span-2 sm:mt-0">
                          {chamadosDetails?.data.dataEncerramento
                            ? chamadosDetails.data.dataEncerramento
                            : 'Não definida'}
                        </dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-zinc-800">
                          Endereço
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-600 sm:col-span-2 sm:mt-0">
                          {chamadosDetails?.data.endereco
                            ? chamadosDetails?.data.endereco
                            : 'Nenhuma'}
                        </dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-zinc-800">
                          Rua Referência
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-600 sm:col-span-2 sm:mt-0">
                          {chamadosDetails?.data.referencia
                            ? chamadosDetails?.data.referencia
                            : 'Nenhuma'}
                        </dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-zinc-800">
                          Responsavél
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-600 sm:col-span-2 sm:mt-0">
                          {chamadosDetails?.data.pessoaResponsavel
                            ? chamadosDetails.data.pessoaResponsavel
                            : 'Nenhum'}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </>
            )}
            {!isLoading && (
              <>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex flex-col space-y-10 mt-11">
                    <h1 className="sm:text-2xl text-xl font-bold text-zinc-800">
                      Histórico do chamado
                    </h1>
                  </div>
                  <div className="mt-11">
                    <div>
                      <table className="w-full">
                        <thead className="bg-indigo-600 border-b border-b-gray-300">
                          <tr>
                            <th className="font-semibold p-2 text-white text-left">
                              data
                            </th>
                            <th className="font-semibold p-2 text-white text-left">
                              Descrição
                            </th>
                            <th className="font-semibold p-2 text-white text-left">
                              Situação
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E4E9EB] bg-white">
                          {chamadosDetails?.data.historico.map(
                            (stateChamado, i) => (
                              <tr key={i}>
                                <td className="p-2 text-sm text-gray-700">
                                  {stateChamado.data}
                                </td>
                                <td className="p-2 text-sm text-gray-700">
                                  {stateChamado.descricao}
                                </td>
                                <td className="p-2 text-sm text-gray-700">
                                  <StateChamadoTextBox
                                    statusSituação={
                                      stateChamado.situacao as SituaçãoProps
                                    }
                                  />
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        {permitionAndStateeValidation && (
          <>
            <div className="flex mt-11 border cursor-pointer border-gray-200 bg-white p-5 rounded-lg gap-4 items-center justify-between">
              <div>
                <Image
                  src={updateChamadoImage}
                  alt="Update chamado Image"
                  width={300}
                  height={300}
                />
              </div>
              <div className="text-center flex flex-col space-y-2">
                <h1 className="font-bold text-xl">
                  Deseja atualizar esse chamado?
                </h1>
                <p className="text-sm text-gray-700 max-w-md">
                  Olá, {user?.nome} como administrador voçê pode atualizar o
                  estado em que esse chamados se encontra.
                </p>
              </div>
              <div>
                <Button onClick={() => setOpenModal(!openModal)}>
                  Atualizar
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
      {/*Aqui está o componente que é responsavél por mostrar o modal do adm e fazer a req  */}
      <UserAdminSettings
        params={params}
        openModal={openModal}
        setOpenModal={setOpenModal}
        chamado={chamadosDetails?.data}
      />
    </>
  );
}
