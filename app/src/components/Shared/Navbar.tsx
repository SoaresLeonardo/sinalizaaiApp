import { useSidebar } from '@/hooks/sidebar';
import { List, SignOut } from 'phosphor-react';
import clsx from 'clsx';

export const Navbar = () => {
  // Estado global do sidebar, caso ele for aberto meu navbar irá se comportar diferente do fechado.
  const { open, setOpen } = useSidebar();
  return (
    <nav
      className={clsx(
        `fixed bg-[#7E3AF2]`,
        open ? 'w-full' : 'w-[calc(100%-260px)] left-[17em]'
      )}
    >
      <div className="px-7 py-4 flex items-center justify-between h-full text-zinc-50">
        <button className="flex items-center" onClick={() => setOpen(!open)}>
          <List size={20} />
        </button>
        <button className="flex items-center space-x-2">
          <span>Sair</span>
          <SignOut size={20} />
        </button>
      </div>
    </nav>
  );
};
