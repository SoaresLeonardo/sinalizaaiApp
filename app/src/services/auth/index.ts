import { ISignInRequest } from '@/interfaces/auth/IAuthSignInService';
import { api } from '../api';
import { AxiosError } from 'axios';

export async function SignInService({ email, senha }: ISignInRequest) {
  try {
    const response = await api.get(process.env.NEXT_PUBLIC_API_SIGNIN_URL, {
      params: {
        email,
        senha
      }
    });

    return {
      data: {
        response: response.data,
        error: false
      }
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        data: {
          error: true,
          msg: error.response?.data.error
        }
      };
    }
    return {
      data: {
        error: true,
        msg: 'Erro interno'
      }
    };
  }
}
