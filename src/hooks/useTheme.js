import { useCallback, useState } from 'react';

// data-theme is applied to <html> pre-paint by the inline script in
// index.html; this hook keeps React state in sync and persists changes.
export function useTheme() {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute('data-theme') || 'dark'
  );

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try {
        localStorage.setItem('theme', next);
      } catch {
        /* private mode — theme just won't persist */
      }
      return next;
    });
  }, []);

  return [theme, toggle];
}
