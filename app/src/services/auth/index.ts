import { ISignInRequest } from '@/interfaces/auth/IAuthSignInService';
import { api } from '../api';

export async function SignInService({ email, senha }: ISignInRequest) {
  const response = await api.get(process.env.NEXT_PUBLIC_API_SIGNIN_URL, {
    params: {
      email,
      senha
    }
  });

  return response.data;
}
