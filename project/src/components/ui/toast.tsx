import { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import type { ToastState } from '../../types/toast';

interface ToastProps {
  toast: ToastState | null;
  onDismiss: () => void;
}

export function Toast({ toast, onDismiss }: ToastProps) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0"
          role="status"
          aria-live="polite"
        >
          <div
            className={cn(
              'flex items-center gap-3 rounded-xl border px-4 py-3 shadow-card-hover',
              toast.type === 'success'
                ? 'border-success/20 bg-white'
                : 'border-error/20 bg-white',
            )}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
            ) : (
              <AlertCircle className="h-5 w-5 shrink-0 text-error" />
            )}
            <p className="text-sm font-medium text-secondary-800">{toast.message}</p>
            <button
              onClick={onDismiss}
              aria-label="Dismiss notification"
              className="ml-2 text-secondary-400 transition-colors hover:text-secondary-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
