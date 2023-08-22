import {
  ISignInRequest,
  ISignInResponse
} from '@/interfaces/auth/IAuthSignInService';
import { api } from '../api';
import { AxiosError } from 'axios';

export async function SignInService({
  email,
  senha
}: ISignInRequest): Promise<ISignInResponse> {
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
          msg: error.response?.data.error,
          response: null
        }
      };
    }
    return {
      data: {
        error: true,
        msg: 'Erro interno',
        response: null
      }
    };
  }
}
