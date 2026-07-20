import { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import type { QrCustomization } from '../../types';
import { SIZE_PIXELS } from '../../constants';
import { createQrCode } from '../../services/qr-generator';
import QRCode from 'qrcode';
import { cn } from '../../lib/utils';

interface QrPreviewProps {
  content: string;
  customization: QrCustomization;
  className?: string;
}

/**
 * Renders a live QR code preview. The QRCodeStyling instance is recreated
 * when content or customization changes and re-attached to the container.
 */
export function QrPreview({ content, customization, className }: QrPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    qrRef.current = createQrCode({
      content,
      customization,
      sizeOverride: SIZE_PIXELS[customization.size],
    });

    const container = containerRef.current;
    container.innerHTML = '';
    qrRef.current.append(container);
    return () => {
      container.innerHTML = '';
    };
  }, [content, customization]);

  return (
    <div
      className={cn('flex items-center justify-center', className)}
      role="img"
      aria-label={content ? 'QR code preview' : 'QR code preview placeholder'}
    >
      <div
        ref={containerRef}
        className="overflow-hidden rounded-xl"
        style={{ backgroundColor: customization.backgroundColor }}
      />
    </div>
  );
}
