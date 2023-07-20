import { zodResolver } from '@hookform/resolvers/zod';
import { FormProps, schema } from './schema';
import { useForm } from 'react-hook-form';

export const useLoginUserForm = () => {
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

  const loginUser = (data: FormProps) => {
    console.log(data);
    // axios - API
  };

  return {
    register,
    handleSubmit,
    errors,
    loginUser
  };
};
