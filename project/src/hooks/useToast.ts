import { useState } from 'react';
import type { ToastState } from '../types/toast';

export type { ToastState } from '../types/toast';

export function useToast() {
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ id: Date.now(), message, type });
  };

  const dismissToast = () => setToast(null);

  return { toast, showToast, dismissToast };
}
