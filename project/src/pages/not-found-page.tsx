import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, QrCode as QrCodeIcon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useSeo } from '../hooks/useSeo';

export function NotFoundPage() {
  useSeo({
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist.',
    canonical: '/404',
  });

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-gradient-hero px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
          <QrCodeIcon className="h-10 w-10" />
        </div>
        <p className="mt-6 text-6xl font-extrabold text-secondary-900">404</p>
        <h1 className="mt-2 text-2xl font-bold text-secondary-900">Page Not Found</h1>
        <p className="mx-auto mt-3 max-w-md text-secondary-500">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/">
            <Button size="lg" className="w-full sm:w-auto">
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Link to="/generator">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <QrCodeIcon className="h-4 w-4" />
              Go to Generator
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
