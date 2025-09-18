// hook for smooth scrolling to ref
import { useCallback, RefObject } from 'react';

export function useScrollTo<T extends HTMLElement>(ref: RefObject<T | null>) {
  return useCallback(() => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [ref]);
}
