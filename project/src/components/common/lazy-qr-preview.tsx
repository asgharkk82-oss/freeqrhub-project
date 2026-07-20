import { lazy, Suspense } from 'react';
import { DEFAULT_CUSTOMIZATION } from '../../constants';

const QrPreview = lazy(() => import('../../features/qr-generator/qr-preview').then((m) => ({ default: m.QrPreview })));

interface LazyQrPreviewProps {
  content: string;
  customization?: typeof DEFAULT_CUSTOMIZATION;
  className?: string;
}

export function LazyQrPreview({ content, customization = DEFAULT_CUSTOMIZATION, className }: LazyQrPreviewProps) {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-secondary-200 border-t-primary-600" />
        </div>
      }
    >
      <QrPreview content={content} customization={customization} className={className} />
    </Suspense>
  );
}
