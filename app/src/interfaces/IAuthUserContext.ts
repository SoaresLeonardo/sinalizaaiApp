export interface IUser {
  email?: string;
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
