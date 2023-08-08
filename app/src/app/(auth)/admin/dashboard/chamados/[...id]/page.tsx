type Props = {
  params: {
    id: number;
  };
};

export default function AdminChamadoId({ params }: Props) {
  return (
    <>
      <h1>Olá este é o id do chamado{params.id}</h1>
    </>
  );
}
