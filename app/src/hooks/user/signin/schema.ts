import { z } from 'zod';

export const schema = z.object({
  email: z
    .string()
    .nonempty('Voçê deve inserir seu e-mail.')
    .email('Preencha este campo com um e-mail válido!'),
  senha: z
    .string()
    .nonempty('Voçê precisa inserir uma senha.')
    .min(6, 'A senha precisa ter pelo menos 6 caracteres')
});

export type FormProps = z.infer<typeof schema>;
