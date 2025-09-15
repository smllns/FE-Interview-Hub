'use client';

import { createPortal } from 'react-dom';
import { ArrowBigLeft, X } from 'lucide-react';
import FormSignup from './forms/FormSignup';
import { useAuthForms } from '@/hooks/useAuthForms';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import FormLogin from './forms/FormLogin';
import FormReset from './forms/FormReset';

export default function AuthModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const {
    mode,
    submitError,
    loginForm,
    signupForm,
    resetForm,
    handleReset,
    handleLogin,
    handleSignup,
    handleClose,
    handleTabChange,
    resetEmailSent,
  } = useAuthForms({ open, setOpen });

  useLockBodyScroll(open);

  return createPortal(
    <div
      className='fixed inset-0 bg-black/50  flex items-center justify-center z-[9999]'
      onClick={handleClose}
    >
      <div
        className='relative bg-[#e8e8e8] dark:bg-neutral-900 border dark:border-white/30 border-black/40 rounded-xl shadow-lg p-6 w-full max-w-sm'
        onClick={(e) => e.stopPropagation()}
      >
        {/* close button */}
        <button
          className='absolute cursor-pointer top-3 right-3 text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition'
          onClick={handleClose}
        >
          <X size={20} />
        </button>
        {mode === 'reset' && (
          <button
            className='absolute cursor-pointer  left-3 top-3 text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition  '
            onClick={() => handleTabChange('login')}
          >
            <ArrowBigLeft size={20} />
          </button>
        )}

        {/* header */}
        <h2 className='text-2xl font-bold mb-4 text-center'>
          {mode === 'login'
            ? 'Login'
            : mode === 'signup'
            ? 'Sign Up'
            : 'Reset Password'}
        </h2>

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
      </div>
    </div>,
    document.body
  );
}
