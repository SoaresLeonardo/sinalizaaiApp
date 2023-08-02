/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { ReactNode, useState } from 'react';
import { AuthContext } from '@/contexts/Auth';
import { AuthSignInService } from '@/services/auth.service';
import { SetItemCookies } from '@/Utils/setTokenCookies';
import { IUser, SignInData } from '@/interfaces/IAuthUserContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const isAuthenticated = !!user;

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
        maxAge: 60 * 60 * 1 // 1 hour
      });
    }
  }

  function logout() {
    console.log('usuário deslogado');
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
