const delay = (amount = 750) =>
  new Promise((resolve) => setTimeout(resolve, amount));

// Essa função simula uma resposta da API - function criada a fins de testes
export async function ChamadosNaoFinalizados() {
  await delay();

  return {
    data: [
      {
        id: 5,
        latitude: '32323232323',
        longitude: '33232732732',
        tipoIrregularidade: 'QuebraMola'
      },
      {
        id: 6,
        latitude: '32323232',
        longitude: '23232323232',
        tipoIrregularidade: 'QuebraMola'
      },
      {
        id: 7,
        latitude: '32323423232',
        longitude: '32323232323',
        tipoIrregularidade: 'QuebraMola'
      }
    ],
    messages: [],
    statusCode: 200,
    status: '200'
  };
}