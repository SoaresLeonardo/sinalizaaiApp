import { zodResolver } from '@hookform/resolvers/zod';
import { FormProps, schema } from './schema';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/hooks/auth';

export const useSigninUser = () => {
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

  const { signIn } = useAuth();

  const signinUserData = async (data: FormProps) => {
    try {
      await signIn(data);
    } catch (err) {
      console.log(err);
    }
    // axios - API
  };

  return {
    register,
    handleSubmit,
    signinUserData,
    errors
  };
};
