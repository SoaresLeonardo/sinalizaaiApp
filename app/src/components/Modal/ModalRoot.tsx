import { ReactNode } from 'react';

type Props = {
  isOpen?: boolean;
  children: ReactNode;
};

export const ModalRoot = ({ children, isOpen }: Props) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-40 text-neutral-800">
          <div className="flex h-full w-full items-center justify-center">
            <div className="absolute z-50 mx-auto my-0 flex h-[600px] overflow-auto w-[520px] flex-col bg-[#0f1622] rounded-xl border border-gray-800">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
