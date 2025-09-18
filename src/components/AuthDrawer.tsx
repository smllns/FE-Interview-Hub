// auth drawer
'use client';
import React from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuthForms } from '@/hooks/useAuthForms';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { AuthHeader, CloseBtn, FormSwitcher, ResetBtn } from './ui/auths';

interface AuthDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AuthDrawer: React.FC<AuthDrawerProps> = ({ open, setOpen }) => {
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
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay*/}
          <motion.div
            className='fixed inset-0 bg-black/50 z-40'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Drawer */}
          <motion.div
            className='fixed bottom-0 w-full  max-w-md rounded-t-2xl bg-[#e8e8e8] dark:bg-neutral-900 z-50 shadow-lg left-1/2 -translate-x-1/2 h-[80vh] flex flex-col justify-center'
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className='flex justify-between p-4'>
              <CloseBtn handleClose={handleClose} className='top-5 right-5' />
              {mode === 'reset' && (
                <ResetBtn
                  handleTabChange={handleTabChange}
                  className='top-5 left-5'
                />
              )}
            </div>
            <div className='px-6 flex flex-col justify-center flex-1 pb-10'>
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
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default AuthDrawer;
