import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, QrCode as QrCodeIcon } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { LazyQrPreview } from '../../components/common/lazy-qr-preview';
import { DEFAULT_CUSTOMIZATION, QR_TYPES } from '../../constants';
import type { QrTypeId } from '../../types';
import { SectionHeading } from '../../components/ui/section-heading';

const SAMPLE_DATA: Record<QrTypeId, string> = {
  url: 'https://example.com',
  text: 'Hello from FreeQRHub!',
  email: 'mailto:hello@example.com?subject=Hello',
  phone: 'tel:+15551234567',
  sms: 'sms:+15551234567?body=Hi',
  wifi: 'WIFI:T:WPA;S:MyNetwork;P:mypassword;;',
  vcard: 'BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nORG:Acme\nEND:VCARD',
  location: 'geo:40.7128,-74.0060',
};

export function GeneratorPreviewSection() {
  const [activeType, setActiveType] = useState<QrTypeId>('url');
  const content = SAMPLE_DATA[activeType];

  return (
    <section className="section-padding bg-white">
      <div className="container-base">
        <SectionHeading
          eyebrow="Try It Now"
          title="Generate Your QR Code in Seconds"
          description="Pick a type, enter your content and watch your QR code appear instantly. No reloads, no waiting."
        />

        <div className="mx-auto mt-12 max-w-4xl">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Left: Type selector + content */}
            <div className="rounded-2xl border border-secondary-200 bg-white p-6 shadow-card">
              <h3 className="mb-4 text-sm font-semibold text-secondary-900">Choose a QR type</h3>
              <div className="grid grid-cols-4 gap-2">
                {QR_TYPES.slice(0, 8).map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setActiveType(type.id)}
                    className={`rounded-lg border p-2 text-center transition-all ${
                      activeType === type.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-secondary-200 hover:border-primary-200'
                    }`}
                  >
                    <span className={`block text-xs font-semibold ${activeType === type.id ? 'text-primary-700' : 'text-secondary-600'}`}>
                      {type.title}
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-5 rounded-xl bg-surface p-4">
                <p className="text-xs font-medium text-secondary-400">Sample content</p>
                <p className="mt-1.5 break-all text-sm text-secondary-700">
                  {content.length > 60 ? `${content.slice(0, 60)}...` : content}
                </p>
              </div>
              <Link to="/generator" className="mt-5 block">
                <Button fullWidth size="lg">
                  <QrCodeIcon className="h-4 w-4" />
                  Open Full Generator
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Right: Live preview */}
            <motion.div
              key={activeType}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center rounded-2xl border border-secondary-200 bg-gradient-to-br from-surface to-white p-6 shadow-card"
            >
              <div className="aspect-square w-full max-w-[260px] rounded-xl bg-white p-4 shadow-soft">
                <LazyQrPreview content={content} customization={DEFAULT_CUSTOMIZATION} className="h-full w-full" />
              </div>
              <p className="mt-4 text-sm font-medium text-secondary-500">Live preview updates instantly</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
