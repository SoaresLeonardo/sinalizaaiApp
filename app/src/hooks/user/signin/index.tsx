import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormProps, schema } from './schema';
import { useAuth } from '@/hooks/auth';

export const useSigninUser = () => {
  const { SignIn } = useAuth();

  // Formulário + Zod
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors }
  } = useForm<FormProps>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      senha: ''
    }
  });

  const signinUserData = async (data: FormProps) => {
    await SignIn(data);
  };

  return {
    register,
    handleSubmit,
    signinUserData,
    formErrors
  };
};
