//  Custom hook for creating rhf forms with zod.
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const useZodForm = <T extends object>(schema: any): UseFormReturn<T> => {
  return useForm<T>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    delayError: 1000,
  });
};
