'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { useUserForm } from '@/hooks/user';
import { schema } from './user/index';
import Link from 'next/link';

export default function Signup() {
  const { register, errors, handleSubmit, userData } = useUserForm({
    schema,
    urlApi: '/signup'
  });
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full mx-auto flex items-center justify-center">
        <div>
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <h1 className="text-2xl font-bold">Sinaliza Ai</h1>
            <p className="text-neutral-500 text-base">
              Olá, seja bem vindo. Crie uma conta para prosseguir!
            </p>
          </div>
          <form
            className="w-full max-w-sm mt-10 space-y-12"
            onSubmit={handleSubmit(userData)}
          >
            <Input
              placeholder="Por favor, insira seu e-mail"
              label="E-mail"
              type="email"
              error={!!errors.email}
              textHelp={errors.email?.message}
              {...register('email')}
            />
            <Input
              placeholder="Crie uma senha"
              label="Senha"
              type="password"
              error={!!errors.password}
              textHelp={errors.password?.message}
              {...register('password')}
            />
            <Button rounded className="w-full" type="submit">
              Fazer login
            </Button>
          </form>
          <div className="mt-12 text-center">
            <span className="text-sm text-neutral-500 space-x-2">
              <span>Já tem uma conta?</span>
              <Link href="/login" className="text-blue-600 hover:underline">
                Entre agora!
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
