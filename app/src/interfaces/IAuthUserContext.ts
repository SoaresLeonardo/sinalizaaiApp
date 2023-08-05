export interface IUser {
  nome: string;
  role: string;
}

export interface SignInData {
  email: string;
  senha: string;
}

export interface IContext {
  signIn: (data: SignInData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  user: IUser | null;
}
