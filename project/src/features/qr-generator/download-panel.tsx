import { useState } from 'react';
import { Download, FileImage, FileText, FileType2, Loader2 } from 'lucide-react';
import type { DownloadFormat } from '../../types';
import { DOWNLOAD_FORMATS } from '../../constants';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';

interface DownloadPanelProps {
  onDownload: (format: DownloadFormat) => Promise<void>;
  disabled: boolean;
}

const formatIcons = {
  png: FileImage,
  svg: FileType2,
  pdf: FileText,
};

export function DownloadPanel({ onDownload, disabled }: DownloadPanelProps) {
  const [selectedFormat, setSelectedFormat] = useState<DownloadFormat>('png');
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (disabled || downloading) return;
    setDownloading(true);
    try {
      await onDownload(selectedFormat);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-secondary-400">Download Format</p>
      <div className="grid grid-cols-3 gap-2">
        {DOWNLOAD_FORMATS.map((format) => {
          const Icon = formatIcons[format.value];
          const isActive = selectedFormat === format.value;
          return (
            <button
              key={format.value}
              type="button"
              onClick={() => setSelectedFormat(format.value)}
              disabled={disabled}
              className={cn(
                'flex flex-col items-center gap-1.5 rounded-xl border p-3 transition-all disabled:opacity-40',
                isActive
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-secondary-200 bg-white text-secondary-600 hover:border-primary-200',
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm font-semibold">{format.label}</span>
              <span className="text-[10px] text-secondary-400">{format.description}</span>
            </button>
          );
        })}
      </div>
      <Button
        onClick={handleDownload}
        disabled={disabled || downloading}
        fullWidth
        size="lg"
        className="mt-1"
      >
        {downloading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Preparing...
          </>
        ) : (
          <>
            <Download className="h-4 w-4" />
            Download QR Code
          </>
        )}
      </Button>
    </div>
  );
}
