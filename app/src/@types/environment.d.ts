// Tipos de variáveis .env

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_BASE_URL: string; // URL base da API; examplo: https://localhost:3000/suaRota/login?
      NEXT_PUBLIC_API_SIGNIN_URL: string; // URL de login da API
      NEXT_PUBLIC_API_ABRIR_CHAMADO: string; // URL de abrir um novo chamado
      NEXT_PUBLIC_API_LIST_CHAMADOS: string; // URL de listar os chamados
      NEXT_PUBLIC_USER_TYPE: 'admin' | 'user';
    }
  }
}

export {};
