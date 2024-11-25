import { z } from 'zod';

export const formSchema = z.object({
  title: z.string().min(3, 'O número mínimo de caracteres é 3'),
  category: z.string().refine((field) => field !== 'select', {
    message: 'Você precisa escolher uma categoria',
  }),
});

export type FormSchema = z.infer<typeof formSchema>;
