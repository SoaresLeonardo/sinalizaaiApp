import { zodResolver } from '@hookform/resolvers/zod';
import { FormProps, schema } from './schema';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export const useSigninUser = () => {
  const { signIn } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormProps>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const signinUserData = async (data: FormProps) => {
    await signIn(data);
    // axios - API
  };

  return {
    register,
    handleSubmit,
    signinUserData,
    errors
  };
};
