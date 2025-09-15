import { supabase } from './supabaseClient';

// registration
export async function onSubmitSignup(values: {
  email: string;
  password: string;
}) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });

    if (error) throw error;

    const user = data.user;

    if (user) {
      // adding user to profiles table
      await supabase.from('profiles').insert({
        id: user.id,
        email: user.email,
      });
    }

    return { user, error: null };
  } catch (err: unknown) {
    return {
      user: null,
      error: err instanceof Error ? err : new Error('Unknown error'),
    };
  }
}

// login
export async function onSubmitLogin(values: {
  email: string;
  password: string;
}) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) throw error;

    return { user: data.user, error: null };
  } catch (err: unknown) {
    return {
      user: null,
      error: err instanceof Error ? err : new Error('Unknown error'),
    };
  }
}

// logout
export async function onLogout() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    return { error: null };
  } catch (err: unknown) {
    return { error: err instanceof Error ? err : new Error('Unknown error') };
  }
}

// reset password
export async function onResetPassword(email: string) {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset`,
    });

    if (error) throw error;
    return { data, error: null };
  } catch (err: unknown) {
    return {
      data: null,
      error: err instanceof Error ? err : new Error('Unknown error'),
    };
  }
}

// change password
export async function onChangePassword(password: string) {
  try {
    const { error } = await supabase.auth.updateUser({ password });

    if (error) throw error;
    return { error: null };
  } catch (err: unknown) {
    return { error: err instanceof Error ? err : new Error('Unknown error') };
  }
}

// reset pass redirect page
export const onResetPass = async (values: { password: string }) => {
  try {
    const { error } = await supabase.auth.updateUser({
      password: values.password,
    });

    if (error) throw error;

    return { error: null };
  } catch (err: unknown) {
    return { error: err instanceof Error ? err : new Error('Unknown error') };
  }
};
