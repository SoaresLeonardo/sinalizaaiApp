export type SituaçãoProps =
  | 'Aberto'
  | 'Análise'
  | 'Execução'
  | 'Bloqueado'
  | 'Finalizado';

const StateChamado = ({
  statusSituação
}: {
  statusSituação: SituaçãoProps;
}) => {
  return (
    <>
      {statusSituação === 'Aberto' && (
        <div className="flex items-center space-x-2 text-zinc-600 text-sm">
          <span>Aberto</span>
          <div className="bg-blue-400 w-3 h-3 rounded-full" />
        </div>
      )}

      {statusSituação === 'Análise' && (
        <div className="flex items-center space-x-2 text-zinc-600 text-sm">
          <span>Análise</span>
          <div className="bg-yellow-400 w-3 h-3 rounded-full" />
        </div>
      )}
      {statusSituação === 'Execução' && (
        <div className="flex items-center space-x-2 text-zinc-600 text-sm">
          <span>Execução</span>
          <div className="bg-green-400 w-3 h-3 rounded-full" />
        </div>
      )}
      {statusSituação === 'Bloqueado' && (
        <div className="flex items-center space-x-2 text-zinc-600 text-sm">
          <span>Bloqueado</span>
          <div className="bg-red-400 w-3 h-3 rounded-full" />
        </div>
      )}
      {statusSituação === 'Finalizado' && (
        <div className="flex items-center space-x-2 text-zinc-600 text-sm">
          <span>Finalizado</span>
          <div className="bg-gray-400 w-3 h-3 rounded-full" />
        </div>
      )}
    </>
  );
};

export default StateChamado;
