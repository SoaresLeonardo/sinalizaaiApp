'use client';

import React, { ReactNode } from 'react';
import { UserActions } from './User';
import { useSidebar } from '@/hooks/sidebar';
import { List, X } from 'phosphor-react';
import { Sidebar } from '../Shared/Sidebar';
import { Header } from '../Shared/Header';

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const { open, setOpen } = useSidebar();

  return (
    <div className="min-h-screen grid grid-col-1 lg:grid-cols-6">
      {/* Sidebar Component */}
      <Sidebar />
      {/* Content */}
      <div className="col-span-5 bg-gray-50">
        {/* Header Component */}
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
      <UserActions />
    </div>
  );
};

export default Layout;
