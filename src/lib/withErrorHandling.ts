// helper for auth functions
import { showToast } from './toastUtils';

export const withErrorHandling = async (
  action: () => Promise<{ error?: { message: string } | null }>,
  successMessage: string,
  setSubmitError: (value: string | null) => void,
  onSuccess?: () => void
) => {
  const { error } = await action();
  if (error) {
    setSubmitError(error.message);
    showToast('❌ Something went wrong. Try again later.');
    return;
  }
  setSubmitError(null);
  showToast(successMessage);
  onSuccess?.();
};
