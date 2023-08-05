import { useAuth } from '@/hooks/auth';
import { SignOut, User } from 'phosphor-react';

export const Header = () => {
  const { user, logout } = useAuth();
  return (
    <header className="p-4 h-16 border-b border-b-gray-900">
      <div className="w-full h-full flex items-center justify-between text-zinc-100">
        <div className="flex items-center space-x-3 cursor-pointer">
          <User size={20} className="text-[#7E3AF2]" />

          <div className="flex flex-col">
            {!user?.nome && !user?.role && (
              <div className="max-w-sm animate-pulse">
                <div className="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-1"></div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-14 mb-1"></div>
              </div>
            )}
            {user?.nome && user?.role && (
              <>
                <h1 className="font-semibold">{user?.nome}</h1>
                <span className="text-xs text-zinc-400">
                  {user?.role === 'Cidadao'
                    ? 'Cidadão'
                    : user?.nome === 'Administrador'
                    ? 'Administrador'
                    : ''}
                </span>
              </>
            )}
          </div>
        </div>

        <button
          className="flex items-center space-x-3 hover:text-red-600 transition-colors"
          onClick={logout}
        >
          <span>Sair</span>
          <SignOut size={20} />
        </button>
      </div>
    </header>
  );
};
