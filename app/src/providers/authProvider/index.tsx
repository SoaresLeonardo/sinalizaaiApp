'use client';

import { ReactNode, useEffect, useState } from 'react';
import { AuthContext } from '@/contexts/Auth';
import { SetItemCookies } from '@/Utils/setTokenCookies';
import { IUser, SignInData } from '@/interfaces/auth/IAuthUserContext';
import { destroyCookie } from 'nookies';
import { useRouter } from 'next/navigation';
import { SignInService } from '@/services/auth';
import { GetItemCookies } from '@/Utils/getTokenCookies';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(null);
  const token = GetItemCookies('SinalizaAi.token');

  const isAuthenticated = !!user;

  useEffect(() => {
    const getUserName = GetItemCookies('SinalizaAi.user.nome') || '';
    const getUserRole = GetItemCookies('SinalizaAi.user.role') || '';

    if (token) {
      setUser({ nome: getUserName, role: getUserRole });
    }
  }, [token]);

  async function SignIn({ email, senha }: SignInData) {
    const { data } = await SignInService({ email, senha });

    // Caso a API retornar algum erro ele é capturado aqui.
    if (data.error) {
      console.log(data.msg);

      return;
    }

    /*
     Caso não for capturado algum erro e a API retornar o token do usuário
      eu vou inserir-lo dentro dos cookies
    */
    if (data.response?.token) {
      SetItemCookies('SinalizaAi.token', data.response.token, {
        maxAge: 60 * 60 * 3 // 3 hour
      });
    }

    if (data.response?.nome) {
      SetItemCookies('SinalizaAi.user.nome', data.response.nome);
    }

    if (data.response?.role) {
      SetItemCookies('SinalizaAi.user.role', data.response.role);
    }

    router.push('/user/dashboard');
  }

  function logout() {
    console.log('usuário deslogado');
    destroyCookie({}, 'SinalizaAi.token');
    destroyCookie({}, 'SinalizaAi.user.nome');
    destroyCookie({}, 'SinalizaAi.user.role');

    setUser(null);

    router.push('/signin');
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        SignIn,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
