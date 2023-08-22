import { Barricade, Jeep, Trash } from 'phosphor-react';

export function IrregularidadeIcon({
  tipoIrregularidade
}: {
  tipoIrregularidade: string;
}) {
  return (
    <>
      {tipoIrregularidade === '0' && <Trash size={30} />}
      {tipoIrregularidade === '1' && (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="#4f46e5"
            color="#4f46e5"
            viewBox="0 0 256 256"
          >
            <path d="M235.92,199A8,8,0,0,1,225,195.92L155.32,72H136v8a8,8,0,0,1-16,0V72H100.68L31,195.92A8,8,0,0,1,17,188.08L82.32,72H24a8,8,0,0,1,0-16H232a8,8,0,0,1,0,16H173.68L239,188.08A8,8,0,0,1,235.92,199ZM128,112a8,8,0,0,0-8,8v16a8,8,0,0,0,16,0V120A8,8,0,0,0,128,112Zm0,56a8,8,0,0,0-8,8v16a8,8,0,0,0,16,0V176A8,8,0,0,0,128,168Z"></path>
          </svg>
        </>
      )}
      {tipoIrregularidade === '2' && <Jeep size={30} />}
      {tipoIrregularidade === '3' && <Barricade size={30} />}
    </>
  );
}
