import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormProps, UseUserFormProps } from './types';

export const useUserForm = ({ schema, urlApi }: UseUserFormProps) => {
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

  const userData = (data: FormProps) => {
    console.log(data, urlApi);
    // axios - API
  };

  return {
    register,
    handleSubmit,
    errors,
    userData
  };
};
