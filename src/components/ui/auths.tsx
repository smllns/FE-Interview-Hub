// reusable parts in auth modal/drawer
import { ArrowBigLeft, X } from 'lucide-react';
import React from 'react';
import FormLogin from '../forms/FormLogin';
import FormSignup from '../forms/FormSignup';
import FormReset from '../forms/FormReset';
import { UseFormReturn } from 'react-hook-form';
import { SignupForm } from '@/lib/types';

export const AuthHeader = ({ mode }: { mode: string }) => {
  return (
    <h2 className='text-2xl font-bold mb-4 text-center'>
      {mode === 'login'
        ? 'Login'
        : mode === 'signup'
        ? 'Sign Up'
        : 'Reset Password'}
    </h2>
  );
};

export const ResetBtn = ({
  className,
  handleTabChange,
}: {
  className: string;
  handleTabChange: (newMode: 'login' | 'signup' | 'reset') => void;
}) => {
  return (
    <button
      className={`absolute text-gray-600 dark:text-gray-300 ${className}`}
      onClick={() => handleTabChange('login')}
    >
      <ArrowBigLeft size={20} />
    </button>
  );
};

export const CloseBtn = ({
  className,
  handleClose,
}: {
  className: string;
  handleClose: () => void;
}) => {
  return (
    <button
      className={`absolute text-gray-600  dark:text-gray-300 ${className}`}
      onClick={handleClose}
    >
      <X size={20} />
    </button>
  );
};

export const FormSwitcher = ({
  mode,
  loginForm,
  handleLogin,
  handleTabChange,
  submitError,
  signupForm,
  handleSignup,
  resetForm,
  handleReset,
  resetEmailSent,
}: {
  mode: string;
  loginForm: UseFormReturn<{ email: string; password: string }>;
  handleLogin: (data: { email: string; password: string }) => void;
  handleTabChange: (newMode: 'login' | 'signup' | 'reset') => void;
  submitError: string | null;
  signupForm: UseFormReturn<{
    email: string;
    password: string;
    confirmPassword: string;
  }>;
  handleSignup: (data: SignupForm) => void;
  resetForm: UseFormReturn<{ email: string }>;
  handleReset: (data: { email: string }) => void;
  resetEmailSent: boolean;
}) => {
  return (
    <>
      {mode === 'login' ? (
        // login form
        <FormLogin
          loginForm={loginForm}
          onSubmitLogin={handleLogin}
          handleTabChange={handleTabChange}
          submitError={submitError}
        />
      ) : mode === 'signup' ? (
        // signup form
        <FormSignup
          signupForm={signupForm}
          onSubmitSignup={handleSignup}
          handleTabChange={handleTabChange}
          submitError={submitError}
        />
      ) : (
        // reset form
        <FormReset
          resetForm={resetForm}
          onSubmitReset={handleReset}
          submitError={submitError}
          resetEmailSent={resetEmailSent}
        />
      )}
    </>
  );
};
