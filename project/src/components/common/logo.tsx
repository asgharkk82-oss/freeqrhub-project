import { Link } from 'react-router-dom';
import { QrCode } from 'lucide-react';
import { cn } from '../../lib/utils';
import { BRAND } from '../../constants';

interface LogoProps {
  className?: string;
  showText?: boolean;
  to?: string;
}

export function Logo({ className, showText = true, to = '/' }: LogoProps) {
  return (
    <Link
      to={to}
      className={cn('inline-flex items-center gap-2.5 font-semibold transition-opacity hover:opacity-90', className)}
      aria-label={`${BRAND.name} home`}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 shadow-sm">
        <QrCode className="h-5 w-5 text-white" />
      </span>
      {showText && (
        <span className="text-lg font-bold text-secondary-900">
          Free<span className="text-primary-600">QR</span>Hub
        </span>
      )}
    </Link>
  );
}
