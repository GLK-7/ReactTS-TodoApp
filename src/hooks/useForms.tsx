import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormSchema, formSchema } from '../schemas/formSchema';

export const useForms = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Incluímos reset aqui
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  return { register, handleSubmit, errors, reset }; // Agora reset está disponível
};
