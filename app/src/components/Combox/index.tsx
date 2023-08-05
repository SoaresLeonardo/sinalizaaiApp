import { CaretDown, CaretUp } from 'phosphor-react';

type OptionProps = {
  text: string;
  value: string;
};

type ComboxProps = {
  options: OptionProps[];
  textarea: string;
  isOpen: boolean;
};
const Combox = ({ options, isOpen, ...props }: ComboxProps) => {
  return (
    <div className="relative">
      <button className="bg-[#242c37] p-3 rounded-sm outline-none text-zinc-50 border border-gray-600 w-44 flex items-center justify-between text-sm">
        <span>{props.textarea}</span>
        {isOpen ? <CaretUp size={15} /> : <CaretDown size={15} />}
      </button>
      {isOpen && (
        <>
          <div className="absolute bg-[#242c37] p-3 rounded-sm outline-none text-zinc-50 border border-gray-600 w-44 mt-2">
            {options.map((op, i) => (
              <span
                key={i}
                onClick={() => {
                  setSelected({ option: op });
                  setSelectIsOpen(false);
                }}
                className="block p-2 hover:bg-[#333c49] cursor-pointer rounded-sm text-sm"
              >
                {op.text}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Combox;
