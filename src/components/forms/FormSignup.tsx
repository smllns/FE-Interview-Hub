'use client';

import { SignupForm } from '@/lib/types';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import CustomInput from '../ui/input';
import SubmitBtn from '../ui/submitBtn';
import FormSwitchText from '../ui/formSwitch';

type SignupFormProps = {
  signupForm: UseFormReturn<{
    email: string;
    password: string;
    confirmPassword: string;
  }>;
  onSubmitSignup: (data: SignupForm) => void;
  handleTabChange: (newMode: 'login' | 'signup') => void;
  submitError: string | null;
};

const FormSignup: React.FC<SignupFormProps> = ({
  signupForm,
  onSubmitSignup,
  handleTabChange,
  submitError,
}) => {
  return (
    <form
      onSubmit={signupForm.handleSubmit(onSubmitSignup)}
      className='flex flex-col gap-4'
    >
      <CustomInput<SignupForm>
        labelText='Email'
        type='email'
        name='email'
        form={signupForm}
        placeholder='your@email.com'
        autocomplete='email'
      />
      <CustomInput<SignupForm>
        labelText='Password'
        type='password'
        name='password'
        form={signupForm}
        placeholder='strongPassword'
        autocomplete='new-password'
      />
      <CustomInput<SignupForm>
        labelText='Confirm Password'
        type='password'
        name='confirmPassword'
        form={signupForm}
        placeholder='re-enter your password'
        autocomplete='new-password'
      />
      {submitError && (
        <p className='text-sm text-red-500 mt-1 mx-auto'>
          Error: {submitError}
        </p>
      )}
      <SubmitBtn btnLabel='Sign Up' />

      <FormSwitchText
        formText='Already have an account?'
        formLink='Login'
        mode='login'
        handleTabChange={handleTabChange}
      />
    </form>
  );
};

export default FormSignup;
