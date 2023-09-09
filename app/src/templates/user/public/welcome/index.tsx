import Link from 'next/link';

const Welcome = () => {
  return (
    <>
      <div className="lg:h-screen flex items-center justify-center">
        <div className="w-full mx-auto flex flex-col lg:flex-row items-center justify-center lg:gap-28">
          <div className="w-3xl">
            <div className="space-y-3">
              <h1 className="text-2xl font-semibold">Sinaliza Ai</h1>
              <p className="text-gray-700 text-base max-w-md">
                Olá! Somos a equipe Sinaliza AI e estamos muito contentes por
                tê-lo conosco. Desenvolvemos esta aplicação com o objetivo de
                resolver problemas na cidade, tornando-a um lugar muito mais
                agradável para você. Com a sua colaboração, podemos fazer a
                diferença e trabalhar juntos para melhorar o mundo!
              </p>
              <Link href="/signin" className="text-indigo-600 hover:underline">
                Prosseguir
              </Link>
            </div>
          </div>
          <div>
            <img
              src="/img/welcomeImage.svg"
              alt="Bem-vindo(a) Imagem"
              width="325px"
              height="325px"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
