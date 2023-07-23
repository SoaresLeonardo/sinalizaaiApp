export interface IUser {
  email?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface IContext {
  signIn: (data: SignInData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  user: IUser | null;
}
