'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ResetForm } from '@/lib/types';
import CustomInput from '../ui/input';
import SubmitBtn from '../ui/submitBtn';

type ResetFormProps = {
  resetForm: UseFormReturn<{ email: string }>;
  onSubmitReset: (data: { email: string }) => void;
  submitError: string | null;
  resetEmailSent: boolean;
};

const FormReset: React.FC<ResetFormProps> = ({
  resetForm,
  onSubmitReset,
  submitError,
  resetEmailSent,
}) => {
  return (
    <>
      {resetEmailSent ? (
        <p className='mx-auto text-xl text-center flex flex-col gap-2'>
          If an account with this email exists, we’ve sent you a reset link.
          <span className='text-pink-400 '> Check your email!</span>
        </p>
      ) : (
        <form
          onSubmit={resetForm.handleSubmit(onSubmitReset)}
          className='flex flex-col gap-4'
        >
          <CustomInput<ResetForm>
            labelText='Email'
            type='email'
            name='email'
            form={resetForm}
            placeholder='your@email.com'
            autocomplete='email'
          />

          {submitError && (
            <p className='text-sm text-red-500 mt-1 mx-auto'>
              Error: {submitError}
            </p>
          )}
          <SubmitBtn btnLabel='Change Password' />
        </form>
      )}
    </>
  );
};

export default FormReset;
