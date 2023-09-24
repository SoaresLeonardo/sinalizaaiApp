import { BookOpen, HandWaving, MapTrifold } from 'phosphor-react';
import { useSidebar } from '@/hooks/sidebar';
import { useModal } from '@/hooks/modal';

import clsx from 'clsx';

import { useAuth } from '@/hooks/auth';
import { useParams } from 'next/navigation';
import ActiveLinks from '@/components/ActiveLinks';
import Button from '@/components/Button';
import { CheckGeoInfos } from '@/functions/check-geoinfos';
import { useGeoLocation } from '@/hooks/geoLocation';

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
  const { latitudes } = useGeoLocation();

  // Estado da sidebar Open / close Global
  const { open } = useSidebar();
  // Estado do modal Open / Close Global
  const { open: openModal, setOpen } = useModal();
  // Este é onde tem os dados que vem da interação do usuario com o mapa,
  // Abaixo estou apenas buscando as informações que inicialmente tanto X e Y possam ser Null,
  // Ou posso obter o resultado já atualizado contendo X e Y definidos

  const { id } = useParams();

  return (
    <aside
      className={clsx(
        `p-3 lg:static w-[80%] col-span-1 fixed top-0 lg:w-full bottom-0 bg-white border-r border-r-gray-300 transition-transform duration-300 overflow-y-scroll z-10`,
        open ? '-left-0' : '-left-full'
      )}
    >
      <div className="text-center p-8">
        <h1 className="text-lg font-medium text-indigo-600 flex items-center space-x-2">
          <HandWaving size={27} />
          <span className="text-zinc-900">Sinaliza Ai</span>
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
              <img
                src="/img/sidebarImage.svg"
                alt="Sidebar Image"
                className="w-full h-auto"
              />
              <div className="flex flex-col items-center justify-center text-center bg-gray-200 space-y-4 px-6 py-11 rounded-2xl">
                <h1 className="font-bold text-zinc-800">Algum problema?</h1>
                <p className="text-gray-600 text-sm">
                  Abra um chamado para que nossos agentes consigam localizar o
                  problema o mais rápido possivél.
                </p>
                {/*Botão quea abre o modal Para criar um chamado/com validações para saber se os dados necessários foram preenchidos*/}
                <Button
                  onClick={() => setOpen(!openModal)}
                  disabled={
                    CheckGeoInfos({
                      lat: latitudes.geoInfo.latitudeX,
                      lng: latitudes.geoInfo.latitudeY
                    })
                      ? false
                      : true
                  }
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
