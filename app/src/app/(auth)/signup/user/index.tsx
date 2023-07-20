import { z } from 'zod';

export const schema = z.object({
  email: z
    .string()
    .nonempty('Este campo é obrigatório.')
    .email('Preencha este campo com um e-mail válido!'),
  password: z
    .string()
    .nonempty('Este campo é obrigatório.')
    .min(6, 'A senha precisa ter pelo menos 6 caracteres')
});
