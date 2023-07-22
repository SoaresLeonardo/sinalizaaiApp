'use client';

import Link from 'next/link';
import { Envelope, LockKey } from 'phosphor-react';

import loginImage from '../../../../public/imageLoginNotify.svg';
import Image from 'next/image';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { useSigninUser } from '@/hooks/user/signin';

export default function Signin() {
  const { register, errors, handleSubmit, signinUserData } = useSigninUser();

  return (
    <div className="lg:h-screen flex items-center justify-center py-4">
      <div className="w-full mx-auto flex flex-col lg:flex-row items-center justify-center lg:gap-28">
        <div className="flex items-center justify-center w-full h-full lg:w-96  lg:h-96">
          <Image src={loginImage} alt="Login image" className="w-full h-full" />
        </div>
        <div className="flex flex-col items-center justify-center w-full max-w-md px-8 py-12 overflow-hidden">
          <div className="flex flex-col items-center justify-center text-zinc-900 space-y-2 text-center">
            <h1 className="text-2xl font-bold">Sinaliza Ai</h1>
            <p className="text-neutral-500 text-base">
              Seja bem-vindo, faça login para prosseguir
            </p>
          </div>
          <form
            className="w-full max-w-sm mt-10 space-y-12"
            onSubmit={handleSubmit(signinUserData)}
          >
            <Input
              placeholder="Por favor, insira seu e-mail"
              label="E-mail"
              type="email"
              error={!!errors.email}
              textHelp={errors.email?.message}
              startAdorment={<Envelope size={25} />}
              {...register('email')}
            />
            <Input
              placeholder="Por favor, insira sua senha"
              label="Senha"
              type="password"
              error={!!errors.password}
              textHelp={errors.password?.message}
              startAdorment={<LockKey size={25} />}
              {...register('password')}
            />
            <Button rounded className="w-full" type="submit" variant="primary">
              Fazer login
            </Button>
          </form>
          <div className="mt-12">
            <span className="text-sm text-neutral-500 space-x-2">
              <span>Não tem uma conta?</span>
              <Link href="/signup" className="text-blue-600 hover:underline">
                Crie uma agora!
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
