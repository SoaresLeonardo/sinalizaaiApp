'use client';

import { useSidebar } from '@/hooks/sidebar';
import { List, X } from 'phosphor-react';
import { Sidebar } from '../shared/sidebar';
import { Header } from '../shared/header';
import { User } from '@/components/UserSettings/User';

const LayoutAPP = ({ children }: { children: React.ReactNode }) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <div className="min-h-screen grid grid-col-1 lg:grid-cols-6">
        <Sidebar />
        {/* Content */}
        <div className="col-span-5 bg-gray-100">
          <Header />
          {/* Main Content */}
          <main>{children}</main>
        </div>
        {/*Menu Sidebar*/}
        <button
          onClick={() => setOpen(!open)}
          className="block lg:hidden fixed bottom-4 right-4 bg-indigo-600 p-2 text-zinc-50 rounded-full"
        >
          {open ? <X size={20} /> : <List size={20} />}
        </button>
      </div>
      <User />
    </>
  );
};

export default LayoutAPP;
