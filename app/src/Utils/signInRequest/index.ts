import { SignInData } from '@/interfaces/IAuthUserContext';

import { api } from '@/services/api';

export async function SignInRequest({ email, password }: SignInData) {
  try {
    const request = await api.post('auth/login', { email, password });

    return request.data;
  } catch (error) {
    return null;
  }
}
