import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'flex h-11 w-full rounded-xl border bg-white px-4 text-sm text-secondary-900 transition-colors',
          'placeholder:text-secondary-400',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error
            ? 'border-error focus-visible:ring-error'
            : 'border-secondary-200 hover:border-secondary-300 focus-visible:border-primary-500',
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'flex min-h-[88px] w-full rounded-xl border bg-white px-4 py-3 text-sm text-secondary-900 transition-colors',
          'placeholder:text-secondary-400',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1',
          'disabled:cursor-not-allowed disabled:opacity-50 resize-y',
          error
            ? 'border-error focus-visible:ring-error'
            : 'border-secondary-200 hover:border-secondary-300 focus-visible:border-primary-500',
          className,
        )}
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

interface FieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}

export function Field({ label, htmlFor, error, hint, required, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-secondary-700">
        {label}
        {required && <span className="ml-0.5 text-error">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-secondary-400">{hint}</p>}
      {error && <p className="text-xs font-medium text-error">{error}</p>}
    </div>
  );
}
