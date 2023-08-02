import { SignOut, User } from 'phosphor-react';

export const Header = () => {
  return (
    <header className="p-5 border-b border-b-gray-900">
      <div className="w-full h-full flex items-center justify-between text-zinc-100">
        <div className="flex items-center space-x-3 cursor-pointer">
          <User size={20} className="text-[#7E3AF2]" />

          <h1 className="font-semibold">Olá, Leonardo Henrique.</h1>
        </div>

        <button className="flex items-center space-x-3 hover:text-red-600 transition-colors">
          <span>Sair</span>
          <SignOut size={20} />
        </button>
      </div>
    </header>
  );
};
