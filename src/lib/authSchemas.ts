import z from 'zod';

// Basic field schemas
const emailSchema = z
  .string()
  .min(1, { message: 'Email is required' })
  .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Invalid email format' });

const passwordSchema = z
  .string()
  .min(6, { message: 'Password must be at least 6 characters' });

// schemas for forms
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const resetSchema = z.object({
  email: emailSchema,
});

export const resetPassSchema = z.object({
  password: passwordSchema,
});

export const signupSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
