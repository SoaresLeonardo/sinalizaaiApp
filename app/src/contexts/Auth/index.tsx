'use client';

import { ReactNode, createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { GetItemCookies } from '@/Utils/getTokenCookies';
import { SetItemCookies } from '@/Utils/setTokenCookies';
import { SignInRequest } from '@/Utils/signInRequest';

import { IContext, IUser, SignInData } from '@/interfaces/IAuthUserContext';

import { api } from '@/services/api';

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const Router = useRouter();

  const isAuthenticated = !!user;

  useEffect(() => {
    // Buscando informações atualizadas do usuário no backend
    const token = GetItemCookies('SinalizaAi.token');

    if (token) {
      api.get('auth/profile').then((response) => setUser(response.data));
    }
  }, []);

  async function signIn({ email, password }: SignInData) {
    const { access_token: token } = await SignInRequest({ email, password });

    SetItemCookies('SinalizaAi.token', token, {
      maxAge: 60 * 60 * 1
    });

    Router.push('/user/dashboard');
  }

  function logout() {}

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signIn,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
