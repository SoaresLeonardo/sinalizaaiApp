export interface ISignInRequest {
  email: string;
  senha: string;
}

export interface ISignInResponse {
  data: {
    response?: {
      token: string;
      role: string;
      nome: string;
    };
    error: boolean;
    msg?: string;
  };
}
