import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, Heart } from 'lucide-react';
import { Logo } from '../common/logo';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { BRAND, FOOTER_LINKS } from '../../constants';
import { Toast } from '../ui/toast';
import { useToast } from '../../hooks/useToast';

export function Footer() {
  const { toast, showToast, dismissToast } = useToast();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    showToast('Thanks for subscribing! We\'ll be in touch.', 'success');
    setEmail('');
  };

  return (
    <footer className="border-t border-secondary-200 bg-surface">
      <div className="container-base py-14">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.5fr]">
          {/* Brand */}
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-secondary-500">{BRAND.tagline}</p>
          </div>

          {/* QR Types */}
          <div>
            <h3 className="text-sm font-semibold text-secondary-900">QR Types</h3>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.qrTypes.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-secondary-500 transition-colors hover:text-primary-600">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-sm font-semibold text-secondary-900">Features</h3>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.features.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-secondary-500 transition-colors hover:text-primary-600">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-secondary-900">Company</h3>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-secondary-500 transition-colors hover:text-primary-600">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-secondary-900">Newsletter</h3>
            <p className="mt-4 text-sm text-secondary-500">Get QR tips and product updates.</p>
            <form onSubmit={handleSubscribe} className="mt-3 flex gap-2">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label="Email address"
                className="h-10"
              />
              <Button type="submit" size="sm" className="shrink-0">
                <Send className="h-3.5 w-3.5" />
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-secondary-200 pt-8 sm:flex-row">
          <p className="text-sm text-secondary-400">
            &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-sm text-secondary-400">
            Built with <Heart className="h-3.5 w-3.5 fill-error text-error" /> for privacy
          </p>
        </div>
      </div>

      <Toast toast={toast} onDismiss={dismissToast} />
    </footer>
  );
}
