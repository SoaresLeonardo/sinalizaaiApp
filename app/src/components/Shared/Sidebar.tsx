import { useSidebar } from '@/hooks/sidebar';
import { BookOpen, MapTrifold } from 'phosphor-react';
import { CheckGeoInfos } from '@/Utils/checkGeoInfos';
import { useGeoLocation } from '@/hooks/geoLocation';
import clsx from 'clsx';
import Button from '../Button';
import Image from 'next/image';
import sidebarImage from '../../../public/sidebarImage.svg';
import { useModal } from '@/hooks/modal';
import ActiveLinks from '../ActiveLinks';

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
        `p-3 border-r lg:static w-[80%] border-r-gray-900 col-span-1 fixed top-0 lg:w-full bottom-0 bg-[#0a0f17] transition-transform duration-300 overflow-y-scroll`,
        open ? '-left-0' : '-left-full'
      )}
    >
      <div className="text-center p-8">
        <h1 className="text-base font-bold uppercase text-zinc-50">
          Sinaliza Ai
        </h1>
      </div>
      {/* Menu */}
      <div className="flex flex-col justify-between h-[700px]">
        <nav className="mt-11">
          <ul className="flex flex-col space-y-5">
            {navLinks.map((navLink) => (
              <li key={navLink.name}>
                <ActiveLinks href={navLink.href} passHref legacyBehavior>
                  {navLink.name}
                </ActiveLinks>
              </li>
            ))}
          </ul>
        </nav>
        {/*Imagem do Sidebar & Botão de abrir chamado*/}
        <div className="flex flex-col gap-4">
          <Image
            src={sidebarImage}
            alt="Sidebar Image"
            className="w-full h-auto"
          />
          <div className="flex flex-col items-center justify-center text-center bg-[#242c37] space-y-4 px-6 py-11 rounded-xl">
            <h1 className="font-bold text-zinc-100">Algum problema?</h1>
            <p className="text-gray-400 text-sm">
              Abra um chamado para que nossos agentes consigam localizar o
              problema o mais rápido possivél.
            </p>
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
      </div>
    </aside>
  );
};
