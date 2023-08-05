import React from 'react';

const ChamadoDetailsSkeleton: React.FC = () => {
  return (
    <>
      <div className="mt-6 border-t border-t-gray-800 border-gray-100">
        <dl className="divide-y divide-gray-800">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-zinc-300">
              Nome do usuário
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[120px] animate-pulse"></div>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-zinc-300">
              Irregularidade
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[120px] animate-pulse"></div>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-zinc-300">
              Situação
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[120px] animate-pulse"></div>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-zinc-300">
              Data de abertura
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[120px] animate-pulse"></div>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-zinc-300">
              Data de encerramento
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[120px] animate-pulse"></div>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-zinc-300">
              Rua Referência
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[120px] animate-pulse"></div>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-zinc-300">
              Responsavél
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[120px] animate-pulse"></div>
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
};

export default ChamadoDetailsSkeleton;
