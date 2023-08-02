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
            <div className="absolute z-50 mx-auto my-0 flex h-80 w-[720px] flex-col overflow-hidden bg-white rounded-xl">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
