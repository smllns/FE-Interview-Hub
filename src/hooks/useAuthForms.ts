import { useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { useAuth } from '@/components/useAuth';
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

  const loginForm: UseFormReturn<LoginForm> = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    delayError: 1000,
  });

  const signupForm: UseFormReturn<SignupForm> = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    delayError: 1000,
  });

  const resetForm: UseFormReturn<ResetForm> = useForm<ResetForm>({
    resolver: zodResolver(resetSchema),
    mode: 'onChange',
    delayError: 1000,
  });

  const resetPassForm: UseFormReturn<ResetPassForm> = useForm<ResetPassForm>({
    resolver: zodResolver(resetPassSchema),
    mode: 'onChange',
    delayError: 1000,
  });

  const handleLogin = async (values: LoginForm) => {
    const { error } = await onSubmitLogin(values);
    if (error) {
      setSubmitError(error.message);
      showToast('❌ Something went wrong. Try again later.');
      return;
    }
    await refreshUser();

    if (setOpen) setOpen(false);
    setSubmitError(null);
    showToast('✅ Successfully logged in!');
  };

  const handleLogout = async () => {
    const { error } = await onLogout();
    if (error) {
      setSubmitError(error.message);
      showToast('❌ Something went wrong. Try again later.');
      return;
    }
    await refreshUser();

    if (setOpen) setOpen(false);
    setSubmitError(null);
    showToast('✅ Successfully logged out!');
    router.push('/');
  };

  const handleDeleteAccount = async (user: { id: string } | null) => {
    if (!user) {
      showToast('❌ User not found');
      return;
    }
    try {
      const res = await fetch('/api/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        setSubmitError(error || 'Unknown error');
        showToast('❌ Something went wrong. Try again later.');
        return;
      }

      if (setOpen) setOpen(false);
      clearUserData();
      await refreshUser();
      setSubmitError(null);
      showToast('✅ Account deleted');
      router.push('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSubmitError(err.message);
        showToast('❌ ' + err.message);
      } else {
        setSubmitError('Unknown error');
        showToast('❌ Unknown error');
      }
    }
  };

  const handleSignup = async (values: SignupForm) => {
    const { error } = await onSubmitSignup(values);
    if (error) {
      setSubmitError(error.message);
      showToast('❌ Something went wrong. Try again later.');

      return;
    }
    await refreshUser();
    if (setOpen) setOpen(false);
    setSubmitError(null);
    showToast('✅ Successfully created an account!');
  };

  const handleReset = async ({ email }: { email: string }) => {
    const { error } = await onResetPassword(email);

    if (error) {
      setSubmitError(error.message);
      showToast('❌ Something went wrong. Try again later.');

      return;
    }

    setSubmitError(null);
    setResetEmailSent(true);
  };

  const handleChange = async ({ password }: { password: string }) => {
    const { error } = await onChangePassword(password);

    if (error) {
      setSubmitError(error.message);
      showToast('❌ Something went wrong. Try again later.');

      return;
    }
    if (setOpen) setOpen(false);

    setSubmitError(null);
    setSettingsMode('normal');
    resetPassForm.reset();
    showToast('✅ Successfully created an account!');
  };

  const handleResetPass = async (values: ResetPassForm) => {
    try {
      const { error } = await onResetPass(values);

      if (error) {
        setSubmitError(error.message);
        showToast('❌ Something went wrong. Try again later.');
        return;
      }

      setSubmitError(null);
      if (setSuccess) setSuccess(true);
      showToast('✅ Your password has been updated successfully!');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSubmitError(err.message);
      } else {
        setSubmitError('Unknown error');
      }
    }
  };

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
