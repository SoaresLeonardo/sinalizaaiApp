'use client';

import { ReactNode, useEffect, useState } from 'react';
import { AuthContext } from '@/contexts/Auth';
import { IUser, Role, SignInData } from '@/interfaces/auth/IAuthUserContext';
import { useRouter } from 'next/navigation';
import { SignInService } from '@/services/auth';
import { GetItemCookies } from '@/Utils/getTokenCookies';
import { deleteCookie, setCookie } from 'cookies-next';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [user, setUser] = useState<IUser | null>(null);
  const isAuthenticated = !!user;

  const token = GetItemCookies('SinalizaAi.token');

  // Função que atualiza os dados do usuário quando a página recarrega;
  //Enquanto eu tiver um token(necessariamente estou autenticado)
  useEffect(() => {
    // Buscando os dados dos cookies
    const getUserName = GetItemCookies('SinalizaAi.user.nome') || '';
    const getUserRole = GetItemCookies('SinalizaAi.user.role') as Role;

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

    // Caso não ouver nenhuma resposta com os dados do usuário(dados importantes) eu envio um erro para a aplicação inteira
    if (!data.response) {
      throw new Error('Erro interno atenção');
    }

    if (!data.response.token) {
      throw new Error('Erro interno atenção');
    }

    if (data.response) {
      setCookie('SinalizaAi.token', data.response.token);
      setCookie('SinalizaAi.user.nome', data.response.nome);
      setCookie('SinalizaAi.user.role', data.response.role);

      setUser({
        nome: data.response.nome,
        role: data.response.role
      });

      router.push('/user/dashboard');
    }
  }

  function logout() {
    setUser(null);

    deleteCookie('SinalizaAi.token');
    deleteCookie('SinalizaAi.user.nome');
    deleteCookie('SinalizaAi.user.role');

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
