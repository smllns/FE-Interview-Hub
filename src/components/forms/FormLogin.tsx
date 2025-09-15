'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { LoginForm } from '@/lib/types';
import CustomInput from '../ui/input';
import SubmitBtn from '../ui/submitBtn';
import FormSwitchText from '../ui/formSwitch';

type LoginFormProps = {
  loginForm: UseFormReturn<{ email: string; password: string }>;
  onSubmitLogin: (data: { email: string; password: string }) => void;
  handleTabChange: (newMode: 'login' | 'signup' | 'reset') => void;
  submitError: string | null;
};

const FormLogin: React.FC<LoginFormProps> = ({
  loginForm,
  onSubmitLogin,
  handleTabChange,
  submitError,
}) => {
  return (
    <form
      onSubmit={loginForm.handleSubmit(onSubmitLogin)}
      className='flex flex-col gap-4'
    >
      <CustomInput<LoginForm>
        labelText='Email'
        type='email'
        name='email'
        form={loginForm}
        placeholder='your@email.com'
        autocomplete='email'
      />
      <CustomInput<LoginForm>
        labelText='Password'
        type='password'
        name='password'
        form={loginForm}
        placeholder='strongPassword'
        autocomplete='current-password'
      />

      {submitError && (
        <p className='text-sm text-red-500 mt-1 mx-auto'>
          Error: {submitError}
        </p>
      )}
      <SubmitBtn btnLabel='Login' />

      <p className='text-sm text-center mt-2'>
        Forgot your password?{' '}
        <span
          className='text-pink-400 cursor-pointer hover:underline'
          onClick={() => handleTabChange('reset')}
        >
          Reset Password
        </span>
      </p>

      <FormSwitchText
        formText="Don't have an account?"
        formLink='Sign Up'
        handleTabChange={handleTabChange}
        mode='signup'
      />
    </form>
  );
};

export default FormLogin;
