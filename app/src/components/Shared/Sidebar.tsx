import { BookOpen, Compass, MapTrifold } from 'phosphor-react';
import { useGeoLocation } from '@/hooks/geoLocation';
import { CheckGeoInfos } from '@/Utils/checkGeoInfos';
import { useSidebar } from '@/hooks/sidebar';
import { useModal } from '@/hooks/modal';
import sidebarImage from '../../../public/sidebarImage.svg';
import ActiveLinks from '../ActiveLinks';
import clsx from 'clsx';
import Button from '../Button';
import Image from 'next/image';
import { useAuth } from '@/hooks/auth';
import { useParams } from 'next/navigation';

type LinkProps = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

const navLinks: LinkProps[] = [
  {
    name: 'Mapa',
    href: '/user/dashboard',
    icon: <MapTrifold size={20} />
  },
  {
    name: 'Chamados',
    href: '/user/chamados',
    icon: <BookOpen size={20} />
  }
];

export const Sidebar = () => {
  const { user } = useAuth();

  // Estado da sidebar Open / close Global
  const { open } = useSidebar();
  // Estado do modal Open / Close Global
  const { open: openModal, setOpen } = useModal();
  // Este é onde tem os dados que vem da interação do usuario com o mapa,
  // Abaixo estou apenas buscando as informações que inicialmente tanto X e Y possam ser Null,
  // Ou posso obter o resultado já atualizado contendo X e Y definidos
  const { latitudes } = useGeoLocation();

  const { id } = useParams();

  return (
    <aside
      className={clsx(
        `p-3 lg:static w-[80%] col-span-1 fixed top-0 lg:w-full bottom-0 bg-[#0f1217] transition-transform duration-300 overflow-y-scroll z-10`,
        open ? '-left-0' : '-left-full'
      )}
    >
      <div className="text-center p-8">
        <h1 className="text-lg font-medium text-indigo-600 flex items-center space-x-2">
          <Compass size={27} />
          <span className="text-white">Sinaliza Ai</span>
        </h1>
      </div>
      {/* Menu */}
      <div className="flex flex-col justify-between h-[700px]">
        <nav className="mt-11">
          <ul className="flex flex-col space-y-5">
            {navLinks.map((navLink) => (
              <li key={navLink.name}>
                <ActiveLinks
                  href={navLink.href}
                  passHref
                  legacyBehavior
                  params={{ id: id }}
                >
                  {navLink.icon}
                  <span>{navLink.name}</span>
                </ActiveLinks>
              </li>
            ))}
          </ul>
        </nav>
        {/*Imagem do Sidebar & Botão de abrir chamado*/}
        {user && user.role === 'Cidadao' && (
          <>
            <div className="flex flex-col gap-4">
              <Image
                src={sidebarImage}
                alt="Sidebar Image"
                className="w-full h-auto"
              />
              <div className="flex flex-col items-center justify-center text-center bg-[#14181f] space-y-4 px-6 py-11 rounded-xl">
                <h1 className="font-bold text-white">Algum problema?</h1>
                <p className="text-gray-500 text-sm">
                  Abra um chamado para que nossos agentes consigam localizar o
                  problema o mais rápido possivél.
                </p>
                {/*Botão quea abre o modal Para criar um chamado/com validações para saber se os dados necessários foram preenchidos*/}
                <Button onClick={() => setOpen(!openModal)}>
                  Abrir chamado
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};
