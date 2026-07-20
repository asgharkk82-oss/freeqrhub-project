import { useSearchParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Gift } from 'lucide-react';
import { QrGenerator } from '../features/qr-generator/qr-generator';
import { useSeo } from '../hooks/useSeo';
import type { QrTypeId } from '../types';

const VALID_TYPES: QrTypeId[] = ['url', 'text', 'email', 'phone', 'sms', 'wifi', 'vcard', 'location'];
const PATH_TYPES: Record<string, QrTypeId> = {
  '/wifi-qr-code-generator': 'wifi',
  '/email-qr-code-generator': 'email',
  '/url-qr-code-generator': 'url',
  '/vcard-qr-code-generator': 'vcard',
};
const SEO_CONTENT = {
  url: {
    title: 'Free URL QR Code Generator | FreeQRHub',
    description:
      'Generate free URL QR codes instantly. Create customizable QR codes for websites and download in PNG, SVG or PDF.',
  },
  text: {
    title: 'Free Text QR Code Generator | FreeQRHub',
    description:
      'Create QR codes for plain text messages. Free, customizable and downloadable in PNG, SVG and PDF.',
  },
  email: {
    title: 'Free Email QR Code Generator | FreeQRHub',
    description:
      'Generate email QR codes with pre-filled recipient, subject and message. Free and easy to use.',
  },
  phone: {
    title: 'Free Phone QR Code Generator | FreeQRHub',
    description:
      'Create click-to-call phone QR codes instantly. Download high-quality PNG, SVG and PDF files.',
  },
  sms: {
    title: 'Free SMS QR Code Generator | FreeQRHub',
    description:
      'Generate SMS QR codes with pre-filled phone numbers and messages. Fast, free and secure.',
  },
  wifi: {
    title: 'Free WiFi QR Code Generator | FreeQRHub',
    description:
      'Create WiFi QR codes so users can connect instantly without typing passwords.',
  },
  vcard: {
    title: 'Free vCard QR Code Generator | FreeQRHub',
    description:
      'Generate professional vCard QR codes for business cards and contact sharing.',
  },
  location: {
    title: 'Free Location QR Code Generator | FreeQRHub',
    description:
      'Create GPS location QR codes for Google Maps and navigation.',
  },
} as const;

export function GeneratorPage() {

  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();

  const typeParam = searchParams.get('type') as QrTypeId | null;
 const initialType =
  (typeParam && VALID_TYPES.includes(typeParam)
    ? typeParam
    : PATH_TYPES[pathname]) || 'url';
   
   const CANONICAL_PATHS: Record<QrTypeId, string> = {
  url: '/url-qr-code-generator',
  text: '/generator?type=text',
  email: '/email-qr-code-generator',
  phone: '/generator?type=phone',
  sms: '/generator?type=sms',
  wifi: '/wifi-qr-code-generator',
  vcard: '/vcard-qr-code-generator',
  location: '/generator?type=location',
};
const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": SEO_CONTENT[initialType].title.replace(" | FreeQRHub", ""),
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": `https://freeqrhub.com${CANONICAL_PATHS[initialType]}`
};

  useSeo({
    title: SEO_CONTENT[initialType].title,
    description: SEO_CONTENT[initialType].description,
   canonical: CANONICAL_PATHS[initialType],
   schema,
  });

  return (
    <div className="bg-gradient-hero">
      <div className="container-base py-10 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 text-center"
        >
          <h1 className="text-display-sm font-bold tracking-tight text-secondary-900 sm:text-display-md">
  {SEO_CONTENT[initialType].title.replace(' | FreeQRHub', '')}
</h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-secondary-500 sm:text-lg text-balance">
  {SEO_CONTENT[initialType].description}
</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-sm text-secondary-500">
            <span className="inline-flex items-center gap-1.5">
              <Gift className="h-4 w-4 text-accent-500" /> 100% Free
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-warning" /> Instant
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-success" /> Private
            </span>
          </div>
        </motion.div>

        <QrGenerator initialType={initialType} />
      </div>
    </div>
  );
}
