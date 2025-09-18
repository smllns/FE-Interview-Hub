// hook for checking current theme
import { useState, useEffect } from 'react';

export function useDarkMode(): boolean {
  const [isDark, setIsDark] = useState(
    typeof window !== 'undefined' &&
      document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const updateDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    updateDark();
    const observer = new MutationObserver(updateDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return isDark;
}
