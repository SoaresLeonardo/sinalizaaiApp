/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { ReactNode, useCallback, useEffect, useState } from 'react';
import { AuthContext } from '@/contexts/Auth';
import { AuthSignInService } from '@/services/auth.service';
import { SetItemCookies } from '@/Utils/setTokenCookies';
import { IUser, SignInData } from '@/interfaces/IAuthUserContext';
import { GetItemCookies } from '@/Utils/getTokenCookies';
import { destroyCookie } from 'nookies';
import { useRouter } from 'next/navigation';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(null);

  const isAuthenticated = !!user;

  const setUserState = useCallback(
    (userName: string | null, userRole: string | null) => {
      if (userName && userRole) {
        setUser({ nome: userName, role: userRole });
      }
    },
    []
  );

  useEffect(() => {
    const name = GetItemCookies('SinalizaAi.user.nome');
    const role = GetItemCookies('SinalizaAi.user.role');
    setUserState(name, role);
  }, [setUserState]);

  async function signIn({ email, senha }: SignInData) {
    const { data } = await AuthSignInService({ email, senha });

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
    destroyCookie(undefined, 'SinalizaAi.token', {
      path: '/'
    });
    destroyCookie(undefined, 'SinalizaAi.user.nome', {
      path: '/'
    });
    destroyCookie(undefined, 'SinalizaAi.user.role', {
      path: '/'
    });

    router.push('/signin');
  }

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
