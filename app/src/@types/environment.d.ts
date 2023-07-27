// Tipos de variáveis .env

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_BASE_URL: string;
      NEXT_PUBLIC_API_SIGNIN_URL: string;
      NEXT_PUBLIC_USER_TYPE: 'admin' | 'user';
    }
  }
}

export {};
