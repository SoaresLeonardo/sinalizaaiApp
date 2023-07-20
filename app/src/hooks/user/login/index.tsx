import { zodResolver } from '@hookform/resolvers/zod';
import { FormProps, schema } from './schema';
import { useForm } from 'react-hook-form';

export const useUserLogin = () => {
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

  const loginUserData = (data: FormProps) => {
    console.log(data);
    // axios - API
  };

  return {
    register,
    handleSubmit,
    loginUserData,
    errors
  };
};
