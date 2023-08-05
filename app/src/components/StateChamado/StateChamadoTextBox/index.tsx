import { SituaçãoProps } from '..';

const StateChamadoTextBox = ({
  statusSituação
}: {
  statusSituação: SituaçãoProps;
}) => {
  return (
    <>
      {statusSituação === 'Aberto' && (
        <div className="flex items-center space-x-2 text-zinc-400 text-sm">
          <div className="bg-blue-300 w-auto h-auto rounded-lg p-1">
            <span className="text-sm text-zinc-800 font-semibold">Aberto</span>
          </div>
        </div>
      )}

      {statusSituação === 'Análise' && (
        <div className="flex items-center space-x-2 text-zinc-400 text-sm">
          <div className="bg-yellow-300 w-auto h-auto rounded-lg p-1">
            <span className="text-sm text-zinc-800 font-semibold">Análise</span>
          </div>
        </div>
      )}
      {statusSituação === 'Execução' && (
        <div className="flex items-center space-x-2 text-zinc-400 text-sm">
          <div className="bg-green-300 w-auto h-auto rounded-lg p-1">
            <span className="text-sm text-zinc-800 font-semibold">
              Execução
            </span>
          </div>
        </div>
      )}
      {statusSituação === 'Bloqueado' && (
        <div className="flex items-center space-x-2 text-zinc-400 text-sm">
          <div className="bg-red-300 w-auto h-auto rounded-lg p-1">
            <span className="text-sm text-zinc-800 font-semibold">
              Bloqueado
            </span>
          </div>
        </div>
      )}
      {statusSituação === 'Finalizado' && (
        <div className="flex items-center space-x-2 text-zinc-400 text-sm">
          <div className="bg-gray-300 w-auto h-auto rounded-lg p-1">
            <span className="text-sm text-zinc-800 font-semibold">
              Finalizado
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default StateChamadoTextBox;
