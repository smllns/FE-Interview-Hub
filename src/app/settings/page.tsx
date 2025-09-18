'use client';

import NavigationBar from '@/components/Navbar';
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import GradientBg from '@/components/ui/backgrounds/settingsBg';
import ConfirmModal from '@/components/ConfirmModal';
import { useAuthForms } from '@/hooks/useAuthForms';
import Footer from '@/components/Footer';
import { ActionButton } from '@/components/ui/actionButton';

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
    <>
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
            <ActionButton onClick={handleLogoutModal}>Logout</ActionButton>
            <ActionButton
              onClick={handleChangePasswordModal}
              variant='redLight'
            >
              Change Password
            </ActionButton>
            <ActionButton onClick={handleDeleteAccountModal} variant='redDark'>
              Delete Account
            </ActionButton>
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
      <div className='absolute bottom-0 w-full'>
        <Footer />
      </div>
    </>
  );
};

export default SettingsPage;
