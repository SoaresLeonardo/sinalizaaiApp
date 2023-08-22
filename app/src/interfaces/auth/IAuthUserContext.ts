export type Role = 'Cidadao' | 'Administrador';

export interface IUser {
  nome: string;
  role: Role;
}

export interface SignInData {
  email: string;
  senha: string;
}

export interface IContext {
  SignIn: (data: SignInData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  user: IUser | null;
}
