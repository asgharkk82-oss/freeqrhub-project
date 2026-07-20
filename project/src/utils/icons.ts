import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const indexExport = 'icons' as const;

export function getLucideIcon(name: string): LucideIcon {
  if (name === indexExport) return LucideIcons.QrCode;
  const Icon = (LucideIcons as Record<string, unknown>)[name];
  return (Icon as LucideIcon) ?? LucideIcons.QrCode;
}
