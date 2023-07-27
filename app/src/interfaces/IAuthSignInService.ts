export interface ISignInRequest {
  email: string;
  password: string;
}

export interface ISignInResponse {
  data: {
    response?: {
      token: string;
    };
    error: boolean;
    msg?: string;
  };
}
