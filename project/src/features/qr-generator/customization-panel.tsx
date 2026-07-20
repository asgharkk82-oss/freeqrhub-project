import { useRef } from 'react';
import { Upload, X, RotateCcw } from 'lucide-react';
import type { DotStyle, ErrorCorrectionLevel, QrCustomization } from '../../types';
import {
  CORNER_STYLE_OPTIONS,
  DOT_STYLE_OPTIONS,
  ERROR_CORRECTION_OPTIONS,
  FRAME_OPTIONS,
  FRAME_TEXT_PRESETS,
  PRESET_BACKGROUND_COLORS,
  PRESET_FOREGROUND_COLORS,
  SIZE_OPTIONS,
} from '../../constants';
import { Field, Input } from '../../components/ui/input';
import { Select } from '../../components/ui/select';
import { processLogoUpload } from '../../utils/logo-upload';
import { cn } from '../../lib/utils';

interface CustomizationPanelProps {
  customization: QrCustomization;
  onChange: (patch: Partial<QrCustomization>) => void;
  onReset: () => void;
}

export function CustomizationPanel({ customization, onChange, onReset }: CustomizationPanelProps) {
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.target.files?.[0];
    if (!file) return;
    const result = await processLogoUpload(file);
    if (result.error) {
      alert(result.error);
    } else if (result.dataUrl) {
      onChange({ logoDataUrl: result.dataUrl });
    }
    if (logoInputRef.current) logoInputRef.current.value = '';
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-secondary-900">Customize</h3>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-secondary-400 transition-colors hover:text-primary-600"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </button>
      </div>

      {/* Colors */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-secondary-400">Colors</p>
        <ColorControl
          label="Foreground"
          value={customization.foregroundColor}
          presets={PRESET_FOREGROUND_COLORS}
          onChange={(v) => onChange({ foregroundColor: v })}
        />
        <ColorControl
          label="Background"
          value={customization.backgroundColor}
          presets={PRESET_BACKGROUND_COLORS}
          onChange={(v) => onChange({ backgroundColor: v })}
        />
      </div>

      {/* Style */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-secondary-400">Style</p>
        <Field label="Dot Style">
          <SegmentedControl
            options={DOT_STYLE_OPTIONS}
            value={customization.dotStyle}
            onChange={(v) => onChange({ dotStyle: v as DotStyle })}
          />
        </Field>
        <Field label="Corner Style">
          <SegmentedControl
            options={CORNER_STYLE_OPTIONS}
            value={customization.cornerStyle}
            onChange={(v) => onChange({ cornerStyle: v as QrCustomization['cornerStyle'] })}
          />
        </Field>
        <Field label="Size">
          <SegmentedControl
            options={SIZE_OPTIONS}
            value={customization.size}
            onChange={(v) => onChange({ size: v as QrCustomization['size'] })}
          />
        </Field>
      </div>

      {/* Advanced */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-secondary-400">Advanced</p>
        <Field label="Error Correction" hint="Higher levels survive more damage but make codes denser.">
          <Select
            value={customization.errorCorrection}
            onChange={(e) => onChange({ errorCorrection: e.target.value as ErrorCorrectionLevel })}
          >
            {ERROR_CORRECTION_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </Select>
        </Field>
        <Field label={`Margin: ${customization.margin}`}>
          <input
            type="range"
            min={0}
            max={10}
            value={customization.margin}
            onChange={(e) => onChange({ margin: Number(e.target.value) })}
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary-200 accent-primary-600"
          />
        </Field>
      </div>

      {/* Frame */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-secondary-400">Frame</p>
        <Field label="Frame Style">
          <Select
            value={customization.frameStyle}
            onChange={(e) => onChange({ frameStyle: e.target.value as QrCustomization['frameStyle'] })}
          >
            {FRAME_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </Select>
        </Field>
        {customization.frameStyle !== 'none' && (
          <Field label="Frame Text">
            <div className="flex flex-wrap gap-1.5">
              {FRAME_TEXT_PRESETS.map((text) => (
                <button
                  key={text}
                  type="button"
                  onClick={() => onChange({ frameText: text })}
                  className={cn(
                    'rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors',
                    customization.frameText === text
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-secondary-200 text-secondary-500 hover:border-primary-200',
                  )}
                >
                  {text}
                </button>
              ))}
            </div>
            <Input
              value={customization.frameText}
              onChange={(e) => onChange({ frameText: e.target.value })}
              placeholder="Custom text"
              className="mt-2"
            />
          </Field>
        )}
      </div>

      {/* Logo */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-secondary-400">Logo</p>
        {customization.logoDataUrl ? (
          <div className="flex items-center gap-3 rounded-xl border border-secondary-200 p-3">
            <img src={customization.logoDataUrl} alt="Logo preview" className="h-12 w-12 rounded-lg object-contain" />
            <div className="flex-1">
              <p className="text-sm font-medium text-secondary-700">Logo added</p>
              <Field label={`Size: ${Math.round(customization.logoSize * 100)}%`}>
                <input
                  type="range"
                  min={0.15}
                  max={0.35}
                  step={0.01}
                  value={customization.logoSize}
                  onChange={(e) => onChange({ logoSize: Number(e.target.value) })}
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary-200 accent-primary-600"
                />
              </Field>
            </div>
            <button
              onClick={() => onChange({ logoDataUrl: null })}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-secondary-400 transition-colors hover:bg-error/10 hover:text-error"
              aria-label="Remove logo"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => logoInputRef.current?.click()}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-secondary-200 px-4 py-5 text-sm font-medium text-secondary-500 transition-colors hover:border-primary-300 hover:bg-primary-50/40 hover:text-primary-600"
          >
            <Upload className="h-4 w-4" />
            Upload logo (PNG, JPG, SVG)
          </button>
        )}
        <input
          ref={logoInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/svg+xml"
          onChange={handleLogoUpload}
          className="hidden"
        />
      </div>
    </div>
  );
}

interface ColorControlProps {
  label: string;
  value: string;
  presets: string[];
  onChange: (value: string) => void;
}

function ColorControl({ label, value, presets, onChange }: ColorControlProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value.toUpperCase())}
            className="h-9 w-9 cursor-pointer rounded-lg border border-secondary-200 bg-white p-0.5"
            aria-label={`${label} color picker`}
          />
        </div>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          className="h-9 font-mono text-xs uppercase"
          aria-label={`${label} hex value`}
        />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {presets.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => onChange(color)}
            className={cn(
              'h-6 w-6 rounded-md border-2 transition-transform hover:scale-110',
              value.toUpperCase() === color ? 'border-primary-500' : 'border-secondary-200',
            )}
            style={{ backgroundColor: color }}
            aria-label={`Select color ${color}`}
          />
        ))}
      </div>
    </div>
  );
}

interface SegmentedControlProps {
  options: readonly { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

function SegmentedControl({ options, value, onChange }: SegmentedControlProps) {
  return (
    <div className="grid grid-flow-col gap-1 rounded-xl bg-secondary-100 p-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={cn(
            'rounded-lg px-3 py-1.5 text-xs font-semibold transition-all',
            value === opt.value
              ? 'bg-white text-primary-700 shadow-sm'
              : 'text-secondary-500 hover:text-secondary-700',
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
