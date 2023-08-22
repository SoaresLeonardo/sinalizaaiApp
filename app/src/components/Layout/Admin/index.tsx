import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { CheckCircle, X, WarningCircle } from 'phosphor-react';
import { IChamadoByIdService } from '@/interfaces/chamados/IGetchamados.id.service';
import { optionsSituacao } from '@/data/options/op.situacao';
import { UpdateChamado } from '@/services/chamados';
import { SituaçãoProps } from '@/@types';
import { OptionProps } from '@/data/options/op.type';
import { useMutation } from 'react-query';
import { ErrorProps } from '../User';
import { useAuth } from '@/hooks/auth';
import { Modal } from '@/components/Modal';
import StateChamado from '@/components/StateChamado';
import Input from '@/components/Input';
import Combox from '@/components/Combox';
import Button from '@/components/Button';

type Props = {
  params: {
    id: number;
  };
  openModal: boolean;
  chamado: IChamadoByIdService | undefined;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

export function UserAdminSettings({
  params,
  setOpenModal,
  openModal,
  chamado
}: Props) {
  const { user } = useAuth();
  // Certificando de que o usuário seja Administrador;
  const permitionUser = user && user.role === 'Administrador' ? true : false;

  // Input contendo o motivo do Fetch de status do chamado via REF
  const motivoInput = useRef<HTMLInputElement>(null);

  // Caso ouver algum erro de autenticação ou na chamada API;
  const [openModalError, setOpenModalError] = useState<ErrorProps>({
    stateModal: false
  });

  const [openModalSuccess, setOpenModalSuccess] = useState(false);

  const [comboxSelected, setComboxSelected] = useState<{
    option: OptionProps;
  } | null>(null);

  // Mutation- Função responsavél por editar meu chamado
  const updateChamado = useMutation(UpdateChamado, {
    // Aqui está os tratamentos, caso ouver sucesso ou erro
    onSuccess: () => {
      setOpenModal(false);
      setOpenModalSuccess(true);
    },
    onError: () => {
      setOpenModalSuccess(false);
      setOpenModal(false);
      // Erro interno na chamada da API
      setOpenModalError({
        stateModal: true,
        msg: 'Ouve um erro ao tentar atualizar o chamado!'
      });
    }
  });

  // Função que valida se todos meus campos foram preenchidos;
  function isDataValid(data: { id: number; situacao: number; motivo: string }) {
    return (
      data.id !== undefined &&
      data.situacao !== undefined &&
      data.motivo !== undefined
    );
  }

  const handleSubmitUpdateChamado = () => {
    const data = {
      id: params.id,
      situacao: comboxSelected?.option.value || 0,
      motivo: motivoInput.current?.value || ''
    };

    // Caso o usuário não tiver permição;
    if (!permitionUser) {
      return {
        error: true,
        msg: 'Usuário não tem permissão para realizar esta ação'
      };
    }

    // Caso ouver algum campo em branco;
    if (!isDataValid(data)) {
      return {
        error: true,
        msg: 'Algum campo ficou em branco. Tente novamente!'
      };
    }

    updateChamado.mutate(data);
  };

  const adminUserAction = () => {
    const result = handleSubmitUpdateChamado();

    // Caso eu tiver algum dos erros da função a cima, eu recebo eles aqui
    if (result?.error) {
      setOpenModalSuccess(false);
      setOpenModal(false);
      setOpenModalError({ stateModal: true, msg: result.msg });
    }
  };
  return (
    <>
      <Modal.Root isOpen={openModal}>
        <Modal.Header>
          <div>
            <Modal.Title>Deseja atualizar esse chamado?</Modal.Title>
            <p className="text-sm text-gray-700">
              Olá, caso deseja atualizar o estado desse chamado.
            </p>
          </div>
          <button
            className="text-zinc-500 bg-gray-100 p-2 rounded-md"
            onClick={() => setOpenModal(false)}
          >
            <X size={20} />
          </button>
        </Modal.Header>
        <Modal.Content>
          <div className="mx-auto p-5 w-full space-y-5">
            <div className="border border-gray-200 w-full p-4 rounded-lg">
              <div className="space-y-2 flex flex-col">
                <span className="text-sm">
                  <strong>Endereço: </strong>
                  {chamado?.endereco}
                </span>
                <span className="text-sm">
                  <strong>Irregularidade:</strong> {chamado?.tipoIrregularidade}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-sm">
                    <strong>Situação:</strong>
                  </span>
                  <StateChamado
                    statusSituação={chamado?.situacao as SituaçãoProps}
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex flex-col gap-5">
                <Input placeholder="Motivo" ref={motivoInput} />
                <Combox
                  selected={comboxSelected?.option}
                  setSelected={setComboxSelected}
                  options={optionsSituacao}
                />
              </div>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={adminUserAction}
            disabled={comboxSelected?.option.value ? false : true}
          >
            Confirmar
          </Button>
        </Modal.Actions>
      </Modal.Root>

      {/*Modal de errors */}
      <Modal.Root isOpen={openModalError.stateModal}>
        <Modal.Content>
          <div className="flex flex-col gap-8 items-center justify-center p-5 m-8">
            <div className="text-red-500">
              <WarningCircle size={68} />
            </div>
            <div className="text-center flex flex-col items-center justify-center">
              <h1 className="font-bold text-xl">{openModalError.msg}</h1>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setOpenModalError({ stateModal: false })}>
            Entendido
          </Button>
        </Modal.Actions>
      </Modal.Root>

      {/*Modal de sucesso */}
      <Modal.Root isOpen={openModalSuccess}>
        <Modal.Content>
          <div className="flex flex-col gap-8 items-center justify-center p-5 m-8">
            <div className="text-emerald-500">
              <CheckCircle size={68} />
            </div>
            <div className="text-center flex flex-col items-center justify-center">
              <h1 className="font-bold text-xl">
                Chamado atualizado com sucesso!
              </h1>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setOpenModalSuccess(false)}>Ok entendi</Button>
        </Modal.Actions>
      </Modal.Root>
    </>
  );
}
