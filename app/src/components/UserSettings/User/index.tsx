import { CheckCircle, Spinner, WarningCircle, X } from 'phosphor-react';
import { IrregularidadeIcon } from '@/components/IrregularidadeIcon';
import { useGeoLocation } from '@/hooks/geoLocation';
import { useMutation } from 'react-query';
import { PostChamado } from '@/services/chamados';
import { useModal } from '@/hooks/modal';
import { useRef, useState } from 'react';
import { useAuth } from '@/hooks/auth';
import { Modal } from '@/components/Modal';
import Button from '@/components/Button';
import Combox from '@/components/Combox';
import { GetLocalizationAPI } from '@/services/getLocalization';
import { optionsIrregularidade } from '@/constants/options-selected/irregularidades-op';
import { OptionProps } from '@/constants/options-selected/type';
import Input from '@/components/Input';

export type ErrorProps = {
  msg?: string | null;
  stateModal: boolean;
};

export function User() {
  // Meus states principais
  const { open: openModal, setOpen: setOpenModal } = useModal();
  const { latitudes, setLatitudes } = useGeoLocation();
  const inputValue = useRef<HTMLInputElement | null>(null);
  console.log(inputValue.current?.value);
  const { user } = useAuth();

  // Checando a role do usuário, caso ela for diferente de 'Cidadão' então o usuário não tem direito de abrir um chamado.
  const permitionUser = user && user.role === 'Cidadao' ? true : false;

  // Caso ouver algum erro de autenticação, no caso um usuário adm tentar abrir o chamado o modal de erro;
  const [openModalError, setOpenModalError] = useState<ErrorProps>({
    stateModal: false
  });

  const [openModalSuccess, setOpenModalSuccess] = useState(false);

  // Tipo da irregularidade combox selected
  const [selected, setSelected] = useState<{ option: OptionProps } | null>(
    null
  );

  // Minha mutation onde é feita a chamada para API
  const createChamadoMutation = useMutation(PostChamado, {
    onSuccess: () => {
      handleCloseModal();
      setOpenModalSuccess(true);
    },
    onError: () => {
      setOpenModalError({
        stateModal: true,
        msg: 'Ouve um erro ao criar o chamado.'
      });
    }
  });

  const getEndereco = async () => {
    const endereco = await GetLocalizationAPI({
      lat: latitudes.geoInfo.latitudeX || 0,
      lng: latitudes.geoInfo.latitudeY || 0
    });

    const streetName = endereco.address.road;

    return {
      rua: streetName
    };
  };

  const handleSubmitCreateChamado = async () => {
    // Dados do chamado a ser criado
    const { rua } = await getEndereco();
    const dataSelected = {
      tipoIrregularidade: selected?.option.value || 0,
      latitude: `${latitudes.geoInfo.latitudeX}` || '',
      longitude: `${latitudes.geoInfo.latitudeY}` || '',
      endereco: rua,
      referencia: inputValue.current?.value || ''
    };

    // Caso o usuário caia nessa condição, possivelmente ele é um administrador ou não tem uma role
    if (!permitionUser) {
      return {
        error: true,
        msg: 'Esta ação só pode ser realizada por usuários comuns ou pessoas autenticadas. Por favor, verifique suas credenciais.'
      };
    }

    // Caso o usuário seja autenticado corretamente então:
    if (permitionUser) {
      createChamadoMutation.mutate(dataSelected);
      return;
    }
  };

  // Função que fecha meu modal e limpa os dados globais
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelected(null);

    setLatitudes({
      geoInfo: {
        latitudeX: null,
        latitudeY: null
      }
    });
  };

  // Função que é chamada ao confirmar a criação do chamado
  const createChamadoAction = async () => {
    const result = await handleSubmitCreateChamado();

    // Caso seja capturado algum retorno com erro na função, o modal de erro irá abrir com as seguintes informações:
    if (result?.error) {
      handleCloseModal();
      setOpenModalError({ stateModal: true, msg: result.msg });
    }
  };

  return (
    <>
      {/*Modal de criação do chamado */}
      <Modal.Root isOpen={openModal}>
        <Modal.Header>
          <div className="flex flex-col space-y-1">
            <Modal.Title>Abrir um chamado.</Modal.Title>
            <p className="text-sm text-gray-700">
              Selecione o motivo do chamado na região selecionada.
            </p>
          </div>
          <button
            className="text-zinc-500 bg-gray-100 p-2 rounded-md"
            onClick={handleCloseModal}
          >
            <X size={20} />
          </button>
        </Modal.Header>
        <Modal.Content>
          <div className="flex flex-col items-center justify-center gap-14 p-5 w-full">
            <div className="w-full mx-auto">
              {/*Exemplo do chamado Item */}
              <div className="p-2 cursor-pointer w-full mt-2 bg-white border rounded-lg border-gray-300 flex items-center space-x-5 transition duration-75">
                <div className="p-3 bg-gray-100 text-indigo-600 rounded-lg">
                  <IrregularidadeIcon
                    tipoIrregularidade={`${selected?.option.value}`}
                  />
                </div>
                <div className="flex items-center justify-between w-full">
                  <span className="text-zinc-800 font-semibold">
                    {selected?.option.value == null
                      ? ''
                      : `${selected?.option.text} Irregular`}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-center text-center space-y-1 flex-col">
                <h1 className="font-bold text-zinc-800 text-lg">
                  Qual o problema que deseja reportar?
                </h1>
                <p className="max-w-md text-sm text-gray-700">
                  Por favor, apresente-nos o problema específico para que
                  possamos resolvê-lo o mais rápido possível.
                </p>
              </div>
              {/*Form*/}
              <div className="flex flex-col space-y-5">
                <Combox
                  selected={selected?.option}
                  setSelected={setSelected}
                  options={optionsIrregularidade}
                />
                <Input placeholder="Referência" ref={inputValue} />
              </div>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            disabled={selected ? false : true}
            onClick={createChamadoAction}
          >
            {createChamadoMutation.isLoading ? (
              <Spinner size={20} className="animate-spin" />
            ) : (
              <>
                <span>Confirmar</span>
              </>
            )}
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
              <h1 className="font-bold text-xl">Erro</h1>
              <p className="text-sm text-gray-700 max-w-sm">
                {openModalError.msg}
              </p>
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
          <div className="flex flex-col gap-4 items-center justify-center p-3">
            <div className="text-emerald-500">
              <CheckCircle size={54} />
            </div>
            <div className="text-center flex flex-col space-y-3 items-center justify-center">
              <h1 className="font-bold text-xl">Sucesso</h1>
              <p className="text-sm text-gray-700">
                Seu chamado foi criado com sucesso!
              </p>
            </div>
            <div className="max-w-md bg-gray-100 p-4 rounded-lg flex flex-col gap-4">
              <div className=" space-y-2">
                <h4 className="font-semibold text-base">E agora?</h4>
                <p className="text-sm text-gray-600">
                  Agradecemos por nos informar sobre a questão. Seu chamado foi
                  enviado e estaremos trabalhando para resolvê-lo o mais breve
                  possível!
                </p>
              </div>
              <div className=" space-y-2">
                <h4 className="font-semibold text-base">Mais</h4>
                <p className="text-sm text-gray-600">
                  Para obter mais informações, fique atento à página /chamados.
                  Estamos empenhados em melhorar constantemente.
                </p>
              </div>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setOpenModalSuccess(false)}>Voltar</Button>
        </Modal.Actions>
      </Modal.Root>
    </>
  );
}
