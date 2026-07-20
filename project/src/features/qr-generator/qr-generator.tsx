import { useCallback, useMemo, useState } from 'react';
import { SlidersHorizontal, History as HistoryIcon, Sparkles } from 'lucide-react';
import type {
  DownloadFormat,
  QrCustomization,
  QrFormData,
  QrTypeId,
} from '../../types';
import { DEFAULT_CUSTOMIZATION } from '../../constants';
import { buildQrContent, hasContent } from '../../utils/qr-content';
import { createQrCode, getQrDataUrl } from '../../services/qr-generator';
import { downloadQrCode } from '../../services/download';
import { useQrHistory } from '../../hooks/useQrHistory';
import { useToast } from '../../hooks/useToast';
import { generateId } from '../../lib/utils';
import { QrTypeSelector } from './qr-type-selector';
import { QrInputForm } from './qr-input-form';
import { QrPreview } from './qr-preview';
import { CustomizationPanel } from './customization-panel';
import { DownloadPanel } from './download-panel';
import { QrHistoryPanel } from './qr-history-panel';
import { cn } from '../../lib/utils';

type Tab = 'customize' | 'history';

interface QrGeneratorProps {
  initialType?: QrTypeId;
}

export function QrGenerator({ initialType = 'url' }: QrGeneratorProps) {
  const [qrType, setQrType] = useState<QrTypeId>(initialType);
  const [formData, setFormData] = useState<QrFormData>({} as QrFormData);
  const [customization, setCustomization] = useState<QrCustomization>(DEFAULT_CUSTOMIZATION);
  const [activeTab, setActiveTab] = useState<Tab>('customize');
  const [isGenerated, setIsGenerated] = useState(false);

  const { history, addItem, removeItem, clear } = useQrHistory();
  const { showToast } = useToast();

  const content = useMemo(() => buildQrContent(qrType, formData), [qrType, formData]);
  console.log("QR Type:", qrType);
console.log("Form Data:", formData);
console.log("QR Content:", JSON.stringify(content));
  const canGenerate = useMemo(() => hasContent(qrType, formData), [qrType, formData]);
  const hasQr = isGenerated && canGenerate;

  const handleContentChange = useCallback((data: QrFormData) => {
    setFormData(data);
    setIsGenerated(true);
  }, []);

  const handleCustomizationChange = useCallback((patch: Partial<QrCustomization>) => {
    setCustomization((prev) => ({ ...prev, ...patch }));
  }, []);

  const handleReset = useCallback(() => {
    setCustomization(DEFAULT_CUSTOMIZATION);
  }, []);

  const handleDownload = useCallback(
    async (format: DownloadFormat) => {
      if (!canGenerate) {
        showToast('Please enter content before downloading.', 'error');
        return;
      }

      try {
        const qr = createQrCode({ content, customization });
        const safeType = qrType;
        await downloadQrCode({
          qr,
          format,
          customization,
          fileName: `freeqrhub-${safeType}`,
        });

        // Save to history
        const dataUrl = await getQrDataUrl(qr, 200);
        addItem({
          id: generateId(),
          type: safeType,
          content,
          previewDataUrl: dataUrl,
          customization,
          createdAt: Date.now(),
        });

        showToast('Your QR Code has been downloaded successfully.', 'success');
      } catch {
        showToast('Unable to download. Please try again.', 'error');
      }
    },
    [content, customization, canGenerate, qrType, addItem, showToast],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_minmax(360px,420px)]">
      {/* Left: Controls */}
      <div className="space-y-6">
        <div className="rounded-2xl border border-secondary-200 bg-white p-5 shadow-card sm:p-6">
          <h2 className="mb-4 text-sm font-semibold text-secondary-900">1. Select QR Type</h2>
          <QrTypeSelector selected={qrType} onSelect={setQrType} />
        </div>

        <div className="rounded-2xl border border-secondary-200 bg-white p-5 shadow-card sm:p-6">
          <h2 className="mb-4 text-sm font-semibold text-secondary-900">2. Enter Content</h2>
          <QrInputForm type={qrType} onContentChange={handleContentChange} />
        </div>
      </div>

      {/* Right: Preview + Tabs */}
      <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-secondary-200 bg-white p-5 shadow-card sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-secondary-900">Live Preview</h2>
            {hasQr && (
              <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">
                <Sparkles className="h-3 w-3" />
                Ready
              </span>
            )}
          </div>

          <div
            className={cn(
              'flex aspect-square items-center justify-center rounded-xl border border-dashed transition-colors',
              hasQr ? 'border-secondary-200 bg-surface' : 'border-secondary-200 bg-surface',
            )}
          >
            {hasQr ? (
              <QrPreview
  key={`${qrType}-${content}`}
  content={content}
  customization={customization}
  className="h-full w-full p-4"
/>
            ) : (
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary-100">
                  <Sparkles className="h-7 w-7 text-secondary-300" />
                </div>
                <p className="mt-3 text-sm font-medium text-secondary-400">Start typing to see your QR code</p>
              </div>
            )}
          </div>

          <div className="mt-5">
            <DownloadPanel onDownload={handleDownload} disabled={!hasQr} />
          </div>
        </div>

        {/* Tabs */}
        <div className="rounded-2xl border border-secondary-200 bg-white p-5 shadow-card sm:p-6">
          <div className="mb-4 grid grid-cols-2 gap-1 rounded-xl bg-secondary-100 p-1">
            <button
              onClick={() => setActiveTab('customize')}
              className={cn(
                'flex items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-semibold transition-all',
                activeTab === 'customize'
                  ? 'bg-white text-primary-700 shadow-sm'
                  : 'text-secondary-500 hover:text-secondary-700',
              )}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Customize
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={cn(
                'flex items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-semibold transition-all',
                activeTab === 'history'
                  ? 'bg-white text-primary-700 shadow-sm'
                  : 'text-secondary-500 hover:text-secondary-700',
              )}
            >
              <HistoryIcon className="h-4 w-4" />
              History
            </button>
          </div>

          {activeTab === 'customize' ? (
            <CustomizationPanel
              customization={customization}
              onChange={handleCustomizationChange}
              onReset={handleReset}
            />
          ) : (
            <QrHistoryPanel history={history} onRemove={removeItem} onClear={clear} />
          )}
        </div>
      </div>
    </div>
  );
}
