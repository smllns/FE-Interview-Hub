'use client';

import NavigationBar from '@/components/Navbar';
import React, { useState } from 'react';
import { useAuth } from '@/components/useAuth';
import GradientBg from '@/components/ui/backgrounds/settingsBg';
import ConfirmModal from '@/components/ConfirmModal';
import { useAuthForms } from '@/hooks/useAuthForms';

const SettingsPage = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [modalMssg, setModalMssg] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const {
    submitError,
    settingsMode: mode,
    setSettingsMode: setMode,
    handleLogout,
    handleDeleteAccount,
    handleChange,
    resetPassForm,
    handleSettingsClose,
  } = useAuthForms({
    open,
    setOpen,
  });

  const handleLogoutModal = () => {
    setModalTitle('Are you sure?');
    setModalMssg('Do you really want to logout?');
    setOpen(true);
  };
  const handleDeleteAccountModal = () => {
    setModalTitle('Warning!');
    setModalMssg(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );
    setOpen(true);
  };

  const handleChangePasswordModal = () => {
    setMode('password');
    setOpen(true);
  };

  return (
    <div className='h-screen w-full relative flex flex-col items-center justify-center px-4'>
      <div className='absolute w-full top-10 z-20 px-4'>
        <NavigationBar />
      </div>

      <GradientBg />

      <div className='relative z-10 flex flex-col items-center bg-white/20 dark:bg-black/20 backdrop-blur-md min-[320px]:p-8 sm:p-10 rounded-xl shadow-2xl min-[320px]:w-[300px] sm:w-[500px] lg:w-[600px]'>
        <h1 className='min-[320px]:text-4xl sm:text-6xl font-black mb-8 uppercase'>
          Settings
        </h1>

        <div className='flex flex-col gap-4 w-full max-w-sm'>
          <button
            onClick={handleLogoutModal}
            className='px-4 py-2  rounded-lg font-bold text-lg text-white bg-black/30 hover:bg-black/40 dark:bg-white/30 dark:hover:bg-white/40 uppercase border dark:border-white/30 border-black/30 transition-all duration-200 cursor-pointer'
          >
            Logout
          </button>

          <button
            onClick={handleChangePasswordModal}
            className='px-4 py-2  rounded-lg font-bold text-lg text-white bg-red-400/50 hover:bg-red-400/70 dark:bg-red-400/60 dark:hover:bg-red-400/80 uppercase border dark:border-white/30 border-black/30 transition-all duration-200 cursor-pointer'
          >
            Change Password
          </button>

          <button
            onClick={handleDeleteAccountModal}
            className='px-4 py-2  rounded-lg font-bold text-lg text-white bg-red-600/60 hover:bg-red-600/80 dark:bg-red-500/60 dark:hover:bg-red-500/70 uppercase border dark:border-white/30 border-black/30 transition-all duration-200 cursor-pointer'
          >
            Delete Account
          </button>
        </div>
      </div>
      <ConfirmModal
        open={open}
        title={modalTitle}
        message={modalMssg}
        error={submitError}
        mode={mode}
        onCancel={handleSettingsClose}
        onConfirm={
          modalMssg.includes('logout')
            ? handleLogout
            : () => handleDeleteAccount(user)
        }
        onChangePassword={handleChange}
        form={resetPassForm}
      />
    </div>
  );
};

export default SettingsPage;
