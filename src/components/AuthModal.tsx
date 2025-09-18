//auth modal
'use client';

import { createPortal } from 'react-dom';
import { useAuthForms } from '@/hooks/useAuthForms';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { AuthHeader, CloseBtn, FormSwitcher, ResetBtn } from './ui/auths';

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
        <CloseBtn
          handleClose={handleClose}
          className='cursor-pointer top-3 right-3 hover:text-black dark:hover:text-white transition'
        />

        {mode === 'reset' && (
          <ResetBtn
            handleTabChange={handleTabChange}
            className='cursor-pointer  left-3 top-3 hover:text-black dark:hover:text-white transition'
          />
        )}

        <AuthHeader mode={mode} />
        <FormSwitcher
          mode={mode}
          loginForm={loginForm}
          handleLogin={handleLogin}
          handleTabChange={handleTabChange}
          submitError={submitError}
          signupForm={signupForm}
          handleSignup={handleSignup}
          resetForm={resetForm}
          handleReset={handleReset}
          resetEmailSent={resetEmailSent}
        />
      </div>
    </div>,
    document.body
  );
}
