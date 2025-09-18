// hook for scroll disabling (used while modal/drawer are open)
import { useEffect } from 'react';

export function useLockBodyScroll(open: boolean) {
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);
}
