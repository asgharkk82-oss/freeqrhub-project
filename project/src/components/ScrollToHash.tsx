import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({
        top: 0,
        behavior: 'auto',
      });
      return;
    }

    const id = hash.replace('#', '');

    const timer = setTimeout(() => {
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });

        window.history.replaceState(
          null,
          '',
          window.location.pathname
        );
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [hash]);

  return null;
}