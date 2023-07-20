import { z } from 'zod';

export type SchemaType = z.ZodObject<
  {
    email: z.ZodString;
    password: z.ZodString;
  },
  'strip',
  z.ZodTypeAny,
  {
    email: string;
    password: string;
  },
  {
    email: string;
    password: string;
  }
>;

export type FormProps = {
  email: string;
  password: string;
};

export type UseUserFormProps = {
  schema: SchemaType;
  urlApi: string;
};
