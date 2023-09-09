'use client';

import { SituaçãoProps } from '@/@types';
import Button from '@/components/Button';
import StateChamadoTextBox from '@/components/StateChamado/StateChamadoTextBox';
import { Admin } from '@/components/UserSettings/Admin';
import { useAuth } from '@/hooks/auth';
import { IChamadoByIdService } from '@/interfaces/chamados/IGetchamados.id.service';
import { GetChamadosByID } from '@/services/chamados';
import { CircleNotch } from 'phosphor-react';
import { useState } from 'react';
import { useQuery } from 'react-query';

type Props = {
  params: {
    id: number;
  };
};

const ChamadosById = ({ params }: Props) => {
  const { user } = useAuth();

  //Modal do administrador
  const [openModal, setOpenModal] = useState(false);

  // Query que busca os detalhes&&Historico do chamado;
  const { data: chamadosDetails, isLoading } = useQuery<{
    data: IChamadoByIdService;
  }>(['SinalizaAi.chamadoById', { params: params.id }], () =>
    GetChamadosByID({ id: params.id })
  );

  // Verificação se o usuário tem a autorização de fazer o update do chamado
  // Verficando a role & o estado atual do chamado(caso for finalizado não será exibida) como se a role !== 'admin'
  const permitionAndStateeValidation =
    user &&
    user.role === 'Administrador' &&
    chamadosDetails?.data.situacao !== 'Finalizado'
      ? true
      : false;

  return (
    <>
      <div className="max-w-7xl mx-auto w-full lg:px-4 p-2 mt-10">
        {isLoading && (
          <>
            <div className="flex items-center justify-center flex-col space-y-3">
              <CircleNotch size={40} className="animate-spin" />
              <span className="text-gray-600">Buscando as informações...</span>
            </div>
          </>
        )}
        {!isLoading && (
          <>
            <div className="p-5 rounded-lg overflow-auto h-96 bg-white">
              <div className="flex flex-col">
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
          </>
        )}
        {/*Ui que somente será exibida caso o usuário seja administrador da aplicação */}
        {permitionAndStateeValidation && (
          <>
            <div className="flex mt-11 border cursor-pointer border-gray-200 bg-white p-5 rounded-lg gap-4 items-center justify-between">
              <div>
                <img
                  src="/img/statusUpdate.svg"
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
      <Admin
        params={params}
        openModal={openModal}
        setOpenModal={setOpenModal}
        chamado={chamadosDetails?.data}
      />
    </>
  );
};

export default ChamadosById;
