import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, QrCode as QrCodeIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { NAV_ITEMS } from '../../constants';
import { Logo } from '../common/logo';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-secondary-200 bg-white/80 backdrop-blur-lg'
          : 'border-b border-transparent bg-white',
      )}
    >
      <nav className="container-base flex h-16 items-center justify-between gap-4" aria-label="Main navigation">
        <Logo />

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-secondary-600 transition-colors hover:bg-secondary-100 hover:text-secondary-900"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/generator"
            className="hidden text-sm font-medium text-secondary-600 transition-colors hover:text-secondary-900 xl:inline-flex"
          >
            Sign In
          </Link>
          <Link to="/generator">
            <Button size="sm">
              <QrCodeIcon className="h-4 w-4" />
              Generate QR Code
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-secondary-700 transition-colors hover:bg-secondary-100 lg:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-secondary-200 bg-white lg:hidden"
          >
            <div className="container-base space-y-1 py-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block rounded-lg px-4 py-3 text-base font-medium text-secondary-700 transition-colors hover:bg-secondary-100"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-3">
                <Link to="/generator">
                  <Button fullWidth size="lg">
                    <QrCodeIcon className="h-4 w-4" />
                    Generate QR Code
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
