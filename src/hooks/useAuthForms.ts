// hook for handling authentication all actions
import { useState } from 'react';
import {
  LoginForm,
  ResetForm,
  ResetPassForm,
  SignupForm,
  UseAuthFormsProps,
} from '@/lib/types';
import {
  loginSchema,
  resetPassSchema,
  resetSchema,
  signupSchema,
} from '@/lib/authSchemas';
import { useAuth } from '@/context/AuthContext';
import {
  onChangePassword,
  onLogout,
  onResetPass,
  onResetPassword,
  onSubmitLogin,
  onSubmitSignup,
} from '@/lib/authActions';
import { showToast } from '@/lib/toastUtils';
import { useRouter } from 'next/navigation';
import { clearUserData } from '@/lib/clearUserData';
import { useZodForm } from './useZodForm';
import { withErrorHandling } from '@/lib/withErrorHandling';

export const useAuthForms = ({
  initialMode = 'login',
  open,
  setOpen,
  setSuccess,
}: UseAuthFormsProps) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'reset'>(initialMode);
  const [settingsMode, setSettingsMode] = useState<'normal' | 'password'>(
    'normal'
  );
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const { refreshUser } = useAuth();
  const router = useRouter();

  const loginForm = useZodForm<LoginForm>(loginSchema);
  const signupForm = useZodForm<SignupForm>(signupSchema);
  const resetForm = useZodForm<ResetForm>(resetSchema);
  const resetPassForm = useZodForm<ResetPassForm>(resetPassSchema);

  const handleLogin = (values: LoginForm) =>
    withErrorHandling(
      () => onSubmitLogin(values),
      '✅ Successfully logged in!',
      setSubmitError,
      () => {
        refreshUser();
        setOpen?.(false);
      }
    );
  const handleLogout = () =>
    withErrorHandling(
      () => onLogout(),
      '✅ Successfully logged out!',
      setSubmitError,
      () => {
        router.push('/');
        setOpen?.(false);
      }
    );

  const handleDeleteAccount = async (user: { id: string } | null) => {
    if (!user) {
      setSubmitError('User not found');
      showToast('❌ User not found');
      return;
    }

    return withErrorHandling(
      async () => {
        const res = await fetch('/api/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id }),
        });

        if (!res.ok) {
          const { error } = await res.json();
          return { error: { message: error || 'Failed to delete account' } };
        }

        return { error: null };
      },
      '✅ Account deleted',
      setSubmitError,
      () => {
        clearUserData();
        refreshUser();
        setOpen?.(false);
        router.push('/');
      }
    );
  };

  const handleSignup = (values: SignupForm) =>
    withErrorHandling(
      () => onSubmitSignup(values),
      '✅ Successfully created an account!',
      setSubmitError,
      () => {
        refreshUser();
        setOpen?.(false);
      }
    );

  const handleReset = ({ email }: { email: string }) =>
    withErrorHandling(
      () => onResetPassword(email),
      '✅ Check your email!',
      setSubmitError,
      () => {
        setResetEmailSent(true);
      }
    );

  const handleChange = ({ password }: { password: string }) =>
    withErrorHandling(
      () => onChangePassword(password),
      '✅ Successfully changed your password!',
      setSubmitError,
      () => {
        setSettingsMode('normal');
        resetPassForm.reset();
        setOpen?.(false);
      }
    );

  const handleResetPass = (values: ResetPassForm) =>
    withErrorHandling(
      () => onResetPass(values),
      '✅ Your password has been updated successfully!',
      setSubmitError,
      () => {
        setSuccess?.(true);
      }
    );

  const handleClose = () => {
    loginForm.reset();
    signupForm.reset();
    setSubmitError(null);
    setMode('login');
    if (setOpen) setOpen(false);
  };

  const handleSettingsClose = () => {
    resetPassForm.reset();
    setSubmitError(null);
    setSettingsMode('normal');
    if (setOpen) setOpen(false);
  };

  const handleTabChange = (newMode: 'login' | 'signup' | 'reset') => {
    setMode(newMode);
    setSubmitError(null);
    if (newMode === 'login') loginForm.reset();
    else signupForm.reset();
  };

  return {
    open,
    setOpen,
    mode,
    setMode,
    settingsMode,
    setSettingsMode,
    submitError,
    loginForm,
    signupForm,
    resetForm,
    resetPassForm,
    handleResetPass,
    handleReset,
    handleLogin,
    handleChange,
    handleSignup,
    handleClose,
    handleSettingsClose,
    handleTabChange,
    handleLogout,
    handleDeleteAccount,
    resetEmailSent,
  };
};
