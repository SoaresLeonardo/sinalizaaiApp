import { useAuth } from '@/hooks/auth';
import { SignOut, User, UserPlus } from 'phosphor-react';
import { UserSkeleton } from '../Skeletons/User';

export const Header = () => {
  const { user, logout } = useAuth();
  return (
    <header className="p-4 h-16 bg-white">
      <div className="w-full h-full flex items-center justify-between text-zinc-800">
        <div className="flex items-center space-x-3 cursor-pointer">
          {user ? (
            <>
              <div className="flex items-center text-indigo-600 p-2 rounded-full">
                {user.role === 'Cidadao' ? (
                  <User size={20} />
                ) : (
                  <UserPlus size={20} />
                )}
              </div>
              <div className="flex flex-col">
                <h1 className="font-medium text-zinc-900">{user.nome}</h1>
                <span className="text-xs text-zinc-500">{user.role}</span>
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
