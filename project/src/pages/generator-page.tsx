import { useSearchParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';


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
  "url": `https://freeqrhub-project.vercel.app${CANONICAL_PATHS[initialType]}`
};

useSeo({
  title: SEO_CONTENT[initialType].title,
  description: SEO_CONTENT[initialType].description,
  canonical: CANONICAL_PATHS[initialType],
  schema,
});

return (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="mb-8 text-center"
  >
    <QrGenerator initialType={initialType} />

    {initialType === 'wifi' && (
      <section className="mx-auto mt-12 max-w-4xl px-4 text-left">
        <h2 className="text-2xl font-bold text-secondary-900">
          What Is a WiFi QR Code?
        </h2>

        <p className="mt-4 text-base leading-7 text-secondary-600">
          A WiFi QR code lets people connect to a wireless network by scanning
          a QR code instead of manually entering the network name and password.
          FreeQRHub makes it easy to create a WiFi QR code instantly and share
          it with guests, customers, friends, or family.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-secondary-900">
          How to Create a WiFi QR Code
        </h2>

        <ol className="mt-4 list-decimal space-y-3 pl-6 text-base leading-7 text-secondary-600">
          <li>Enter your WiFi network name (SSID).</li>
          <li>Enter your WiFi password.</li>
          <li>Select the correct security type.</li>
          <li>Choose whether your network is hidden.</li>
          <li>Generate your WiFi QR code.</li>
          <li>Download your QR code and share it with others.</li>
        </ol>

        <h2 className="mt-10 text-2xl font-bold text-secondary-900">
          Why Use a WiFi QR Code?
        </h2>

        <p className="mt-4 text-base leading-7 text-secondary-600">
          WiFi QR codes make sharing wireless access faster and more convenient.
          Instead of reading or typing a long password, guests can simply scan
          the code with their phone and connect to the network.
        </p>
      </section>
    )}
  </motion.div>
);
}

