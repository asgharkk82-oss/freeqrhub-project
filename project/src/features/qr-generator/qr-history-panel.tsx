import { Download, Trash2, QrCode as QrCodeIcon } from 'lucide-react';
import type { QrHistoryItem } from '../../types';
import { formatDate } from '../../lib/utils';
import { QR_TYPES } from '../../constants';

interface QrHistoryPanelProps {
  history: QrHistoryItem[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

export function QrHistoryPanel({ history, onRemove, onClear }: QrHistoryPanelProps) {
  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-secondary-200 px-6 py-12 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary-100">
          <QrCodeIcon className="h-7 w-7 text-secondary-400" />
        </div>
        <p className="mt-4 text-sm font-medium text-secondary-600">No QR codes created yet.</p>
        <p className="mt-1 text-xs text-secondary-400">Your recent QR codes will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-secondary-900">Recent QR Codes</h3>
        <button
          onClick={onClear}
          className="text-xs font-medium text-secondary-400 transition-colors hover:text-error"
        >
          Clear all
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {history.map((item) => {
          const typeDef = QR_TYPES.find((t) => t.id === item.type);
          return (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl border border-secondary-200 bg-white p-2 transition-all hover:border-primary-200 hover:shadow-card"
            >
              <img
                src={item.previewDataUrl}
                alt={`${typeDef?.title ?? 'QR'} code created on ${formatDate(item.createdAt)}`}
                className="aspect-square w-full rounded-lg object-contain"
                loading="lazy"
              />
              <div className="mt-2 px-1 pb-1">
                <p className="text-xs font-semibold text-secondary-700">{typeDef?.title ?? 'QR'}</p>
                <p className="text-[10px] text-secondary-400">{formatDate(item.createdAt)}</p>
              </div>
              <div className="flex gap-1.5 px-1 pb-1">
                <a
                  href={item.previewDataUrl}
                  download={`freeqrhub-${item.type}-${item.id}.png`}
                  className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-primary-50 py-1.5 text-xs font-medium text-primary-700 transition-colors hover:bg-primary-100"
                >
                  <Download className="h-3 w-3" />
                  Save
                </a>
                <button
                  onClick={() => onRemove(item.id)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-secondary-400 transition-colors hover:bg-error/10 hover:text-error"
                  aria-label="Delete QR code"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
