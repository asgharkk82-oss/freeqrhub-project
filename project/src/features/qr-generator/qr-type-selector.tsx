import { motion } from 'framer-motion';
import type { QrTypeId, QrTypeDefinition } from '../../types';
import { QR_TYPES } from '../../constants';
import { cn } from '../../lib/utils';
import { getLucideIcon } from '../../utils/icons';

interface QrTypeSelectorProps {
  selected: QrTypeId;
  onSelect: (id: QrTypeId) => void;
}

function getIcon(name: string) {
  return getLucideIcon(name);
}

export function QrTypeSelector({ selected, onSelect }: QrTypeSelectorProps) {
  return (
    <div
      className="grid grid-cols-2 gap-2 sm:grid-cols-4"
      role="tablist"
      aria-label="QR code type"
    >
      {QR_TYPES.map((type: QrTypeDefinition) => {
        const Icon = getIcon(type.iconName);
        const isActive = selected === type.id;
        return (
          <button
            key={type.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(type.id)}
            className={cn(
              'group relative flex flex-col items-start gap-2 rounded-xl border p-3 text-left transition-all duration-200',
              isActive
                ? 'border-primary-500 bg-primary-50 shadow-sm'
                : 'border-secondary-200 bg-white hover:border-primary-200 hover:bg-primary-50/40',
            )}
          >
            <span
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-lg transition-colors',
                isActive
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-100 text-secondary-500 group-hover:text-primary-600',
              )}
            >
              <Icon className="h-4.5 w-4.5" strokeWidth={2} />
            </span>
            <div>
              <p className={cn('text-sm font-semibold', isActive ? 'text-primary-700' : 'text-secondary-800')}>
                {type.title}
              </p>
              <p className="mt-0.5 text-xs text-secondary-400">{type.description}</p>
            </div>
            {isActive && (
              <motion.div
                layoutId="active-type-indicator"
                className="absolute inset-0 -z-10 rounded-xl ring-2 ring-primary-500 ring-offset-1"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
