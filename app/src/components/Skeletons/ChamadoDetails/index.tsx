import React from 'react';

const ChamadoDetailsSkeleton: React.FC = () => {
  return (
    <>
      <div className="bg-white p-5 m-4">
        <div className="mt-6 border-t border-t-[#E4E9EB]">
          <dl className="divide-y divide-[#E4E9EB]">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-zinc-600">
                Nome do usuário
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                <div className="h-2 bg-gray-200 rounded-full max-w-[120px] animate-pulse"></div>
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-zinc-600">
                Irregularidade
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                <div className="h-2 bg-gray-200 rounded-full max-w-[120px] animate-pulse"></div>
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-zinc-600">
                Situação
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                <div className="h-2 bg-gray-200 rounded-full max-w-[120px] animate-pulse"></div>
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-zinc-600">
                Data de abertura
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                <div className="h-2 bg-gray-200 rounded-full max-w-[120px] animate-pulse"></div>
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-zinc-600">
                Data de encerramento
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                <div className="h-2 bg-gray-200 rounded-full max-w-[120px] animate-pulse"></div>
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-zinc-600">
                Rua Referência
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                <div className="h-2 bg-gray-200 rounded-full max-w-[120px] animate-pulse"></div>
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-zinc-600">
                Responsavél
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                <div className="h-2 bg-gray-200 rounded-full max-w-[120px] animate-pulse"></div>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};

export default ChamadoDetailsSkeleton;
