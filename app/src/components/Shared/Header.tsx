import { useAuth } from '@/hooks/auth';
import { SignOut, User } from 'phosphor-react';
import { UserSkeleton } from '../Skeletons/User';

export const Header = () => {
  const { user, logout } = useAuth();
  return (
    <header className="p-4 h-16 bg-white  border-b border-b-gray-200">
      <div className="w-full h-full flex items-center justify-between text-zinc-800">
        <div className="flex items-center space-x-3 cursor-pointer">
          {user ? (
            <>
              <div className="flex items-center bg-[#e4e9eba8] p-2 rounded-full">
                <User size={20} className="text-indigo-600" />
              </div>
              <div className="flex flex-col">
                <h1 className="font-semibold text-zinc-800">{user?.nome}</h1>
                <span className="text-xs text-zinc-500">
                  {user && user.role === 'Cidadao' && 'Cidadão'}
                  {user && user.role === 'Administrador' && 'Administrador'}
                </span>
              </div>
            </>
          ) : (
            <>
              <UserSkeleton />
            </>
          )}
        </div>

        <button
          className="flex text-sm items-center space-x-3 hover:text-red-600 transition-colors"
          onClick={logout}
        >
          <span>Sair</span>
          <SignOut size={18} />
        </button>
      </div>
    </header>
  );
};
