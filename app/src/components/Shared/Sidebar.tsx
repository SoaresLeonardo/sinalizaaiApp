import { Binoculars, BookOpen, MapTrifold } from 'phosphor-react';
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

  return (
    <aside
      className={clsx(
        `p-3 border-r lg:static w-[80%] border-r-gray-200 col-span-1 fixed top-0 lg:w-full bottom-0 bg-white transition-transform duration-300 overflow-y-scroll z-10`,
        open ? '-left-0' : '-left-full'
      )}
    >
      <div className="text-center p-8">
        <h1 className="text-base font-bold uppercase text-zinc-800 flex flex-col items-center space-y-2">
          <Binoculars size={28} />
          <span>Sinaliza_Ai</span>
        </h1>
      </div>
      {/* Menu */}
      <div className="flex flex-col justify-between h-[700px]">
        <nav className="mt-11">
          <ul className="flex flex-col space-y-5">
            {navLinks.map((navLink) => (
              <li key={navLink.name}>
                <ActiveLinks href={navLink.href} passHref legacyBehavior>
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
              <div className="flex flex-col items-center justify-center text-center bg-[#e4e9eb9c] space-y-4 px-6 py-11 rounded-xl">
                <h1 className="font-bold text-zinc-800">Algum problema?</h1>
                <p className="text-gray-700 text-sm">
                  Abra um chamado para que nossos agentes consigam localizar o
                  problema o mais rápido possivél.
                </p>
                {/*Botão quea abre o modal Para criar um chamado/com validações para saber se os dados necessários foram preenchidos*/}
                <Button
                  disabled={CheckGeoInfos(
                    latitudes.geoInfo.latitudeX,
                    latitudes.geoInfo.latitudeY
                  )}
                  onClick={() => setOpen(!openModal)}
                >
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
