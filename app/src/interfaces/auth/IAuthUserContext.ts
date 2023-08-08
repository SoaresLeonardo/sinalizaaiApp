export interface IUser {
  nome: string;
  role: 'Administrador' | 'Cidadao';
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
