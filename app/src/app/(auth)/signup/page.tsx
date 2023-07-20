'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';

export default function Signup() {
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
          <form className="w-full max-w-sm mt-10 space-y-12">
            <Input
              placeholder="Por favor, insira seu e-mail"
              label="E-mail"
              type="email"
            />
            <Input placeholder="Crie uma senha" label="Senha" type="password" />
            <Button rounded className="w-full" type="submit">
              Fazer login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
