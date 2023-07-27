import { useSidebar } from '@/hooks/sidebar';
import { BookOpen, MapTrifold } from 'phosphor-react';
import { useModal } from '@/hooks/modal';
import { CheckGeoInfos } from '@/Utils/checkGeoInfos';
import { useGeoLocation } from '@/hooks/geoLocation';
import Button from '../Button';
import clsx from 'clsx';
import Link from 'next/link';

type LinkProps = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

const navLinks: LinkProps[] = [
  {
    name: 'Visualizar mapa',
    href: '/user/dashboard',
    icon: <MapTrifold size={20} />
  },
  {
    name: 'Abrir chamados',
    href: '/user/chamados',
    icon: <BookOpen size={20} />
  }
];

export const Sidebar = () => {
  // Estado da sidebar Open / close Global
  const { open } = useSidebar();
  // Estado do modal Open / Close Global
  const { open: modalOpen, setOpen } = useModal();
  // Este é onde tem os dados que vem da interação do usuario com o mapa,
  // Abaixo estou apenas buscando as informações que inicialmente tanto X e Y possam ser Null,
  // Ou posso obter o resultado já atualizado contendo X e Y definidos
  const { latitudes } = useGeoLocation();

  const handleOpenModal = () => {
    setOpen(!modalOpen);
  };
  return (
    <aside
      className={clsx(
        `bg-[#FFFFFF] fixed top-0 left-0 z-10 h-full w-72 border-r border-r-[#8a8a8e46] transition-transform`,
        open ? '-translate-x-full' : 'translate-x-0'
      )}
    >
      <div className="flex flex-col gap-16 py-5 px-5">
        <div className="text-zinc-800 text-center">
          <h1 className="text-xl font-semibold">Sinaliza Ai</h1>
        </div>
        <nav className="flex flex-col space-y-7 text-zinc-700">
          {navLinks.map((navItem, i) => (
            <Link href={navItem.href} key={i} passHref legacyBehavior>
              <a className="px-4 py-2 rounded-md flex space-x-3 items-center hover:bg-[#e4e4e454] hover:text-zinc-800 transition duration-150">
                {navItem.icon}
                <span>{navItem.name}</span>
              </a>
            </Link>
          ))}
        </nav>
        <div>
          {/*A baixo o botão usa do contexto latitudes dentro de uma função que valida se o X e Y foram
          definidos com cordenadas - number e caso eles estiverem definidos o botão terá um estado diferente de false e assim libero a ação do mesmo;
          */}
          <Button
            className="w-full"
            onClick={handleOpenModal}
            disabled={CheckGeoInfos(
              latitudes.geoInfo.latitudeX,
              latitudes.geoInfo.latitudeY
            )}
          >
            Abrir um chamado
          </Button>
        </div>
      </div>
    </aside>
  );
};
