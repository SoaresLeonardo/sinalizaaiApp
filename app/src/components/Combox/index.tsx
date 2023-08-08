import clsx from 'clsx';
import { CaretDown, CaretUp } from 'phosphor-react';
import { Dispatch, SetStateAction, useState } from 'react';

type OptionProps = {
  text: string;
  value: number | null;
};

type ComboxProps = {
  options: OptionProps[];
  selected: OptionProps;
  static?: boolean;
  setSelected: Dispatch<
    SetStateAction<{
      option: OptionProps;
    }>
  >;
};
const Combox = ({ options, selected, setSelected, ...props }: ComboxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenCombox = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={props.static ? 'relative' : ''}>
      <button
        className="bg-[#242c37] p-3 rounded-sm outline-none text-zinc-50 border border-gray-600 w-44 flex items-center justify-between text-sm"
        onClick={handleOpenCombox}
      >
        <span>{selected?.text}</span>
        {isOpen ? <CaretUp size={15} /> : <CaretDown size={15} />}
      </button>
      {isOpen && (
        <>
          <div
            className={clsx(
              `bg-[#242c37] p-3 rounded-sm outline-none text-zinc-50 border border-gray-600 w-44 mt-2`,
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
                className="block p-2 hover:bg-[#333c49] cursor-pointer rounded-sm text-sm"
              >
                {option.text}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Combox;
