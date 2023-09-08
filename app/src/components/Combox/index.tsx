import clsx from 'clsx';
import { CaretDown, CaretUp } from 'phosphor-react';
import { Dispatch, SetStateAction, useState } from 'react';

type OptionProps = {
  text: string;
  value: number | null;
};

type ComboxProps = {
  options: OptionProps[];
  selected: OptionProps | null | undefined;
  static?: boolean;
  setSelected: Dispatch<
    SetStateAction<{
      option: OptionProps;
    } | null>
  >;
};
const Combox = ({ options, selected, setSelected, ...props }: ComboxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenCombox = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className={props.static ? 'relative' : ''}>
        <button
          className="bg-white p-3 rounded-lg outline-none text-zinc-800 border border-[#08122515] w-full flex items-center justify-between text-sm"
          onClick={handleOpenCombox}
        >
          <span>{selected?.text ? selected.text : 'Selecione'}</span>
          <div className="flex items-center space-x-2">
            <strong className="bg-indigo-600 rounded-full w-5 h-5 text-white text-xs p-2 flex items-center justify-center text-center">
              {options.length}
            </strong>
            {isOpen ? <CaretUp size={15} /> : <CaretDown size={15} />}
          </div>
        </button>
        {isOpen && (
          <>
            <div
              className={clsx(
                `bg-white p-3 rounded-lg z-20 outline-none text-gray-700 border border-[#08122515] w-full mt-2`,
                props.static ? 'absolute' : ''
              )}
            >
              {options.map((option, i) => (
                <span
                  key={i}
                  onClick={() => {
                    setSelected({ option });
                    setIsOpen(false);
                  }}
                  className="block p-3 hover:bg-gray-100 cursor-pointer rounded-sm text-sm"
                >
                  {option.text}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Combox;
