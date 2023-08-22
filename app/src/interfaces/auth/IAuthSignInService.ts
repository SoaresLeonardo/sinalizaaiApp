import { Role } from './IAuthUserContext';

export interface ISignInRequest {
  email: string;
  senha: string;
}

type Response = {
  token: string;
  role: Role;
  nome: string;
};

export interface ISignInResponse {
  data: {
    response: Response | null;
    error: boolean;
    msg?: string;
  };
}
