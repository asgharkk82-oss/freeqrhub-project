import { useSearchParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

import { QrGenerator } from '../features/qr-generator/qr-generator';
import { useSeo } from '../hooks/useSeo';
import type { QrTypeId } from '../types';

const VALID_TYPES: QrTypeId[] = [
  'url',
  'text',
  'email',
  'phone',
  'sms',
  'wifi',
  'vcard',
  'location',
];

const PATH_TYPES: Record<string, QrTypeId> = {
  '/wifi-qr-code-generator': 'wifi',
  '/email-qr-code-generator': 'email',
  '/url-qr-code-generator': 'url',
  '/vcard-qr-code-generator': 'vcard',
  '/phone-qr-code-generator': 'phone',
  '/sms-qr-code-generator': 'sms',
  '/location-qr-code-generator': 'location',
  '/text-qr-code-generator': 'text',
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
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SEO_CONTENT[initialType].title.replace(' | FreeQRHub', ''),
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    url: `https://freeqrhub-project.vercel.app${CANONICAL_PATHS[initialType]}`,
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
            A WiFi QR code lets people connect to a wireless network by
            scanning a QR code instead of manually entering the network name
            and password. FreeQRHub makes it easy to create a WiFi QR code
            instantly and share it with guests, customers, friends, or family.
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
            WiFi QR codes make sharing wireless access faster and more
            convenient. Instead of reading or typing a long password, guests
            can simply scan the code with their phone and connect to the
            network.
          </p>
        </section>
      )}

      {initialType === 'url' && (
        <section className="mx-auto mt-12 max-w-4xl px-4 text-left">
          <h2 className="text-2xl font-bold text-secondary-900">
            What Is a URL QR Code?
          </h2>

          <p className="mt-4 text-base leading-7 text-secondary-600">
            A URL QR code lets people open a website instantly by scanning a
            QR code with their smartphone. Instead of typing a long web
            address, users can scan the code and go directly to the desired
            webpage. FreeQRHub makes it easy to create a free URL QR code in
            seconds.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-secondary-900">
            How to Create a URL QR Code
          </h2>

          <ol className="mt-4 list-decimal space-y-3 pl-6 text-base leading-7 text-secondary-600">
            <li>Enter the website URL you want to share.</li>
            <li>Check that the URL is correct.</li>
            <li>Customize the QR code if desired.</li>
            <li>Choose your preferred download format.</li>
            <li>Generate your URL QR code.</li>
            <li>Download and share your QR code.</li>
          </ol>

          <h2 className="mt-10 text-2xl font-bold text-secondary-900">
            Why Use a URL QR Code?
          </h2>

          <p className="mt-4 text-base leading-7 text-secondary-600">
            URL QR codes make it faster and easier to share websites, landing
            pages, online stores, social media profiles, menus, and other web
            content. They reduce the need for users to manually type web
            addresses and provide a simple way to connect printed materials
            with online content.
          </p>
        </section>
      )}

      {initialType === 'email' && (
        <section className="mx-auto mt-12 max-w-4xl px-4 text-left">
          <h2 className="text-2xl font-bold text-secondary-900">
            What Is an Email QR Code?
          </h2>

          <p className="mt-4 text-base leading-7 text-secondary-600">
            An Email QR code lets people send an email instantly by scanning a
            QR code with their smartphone. It can open an email with a
            pre-filled recipient, subject, and message. FreeQRHub makes it
            easy to create a free Email QR code in seconds.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-secondary-900">
            How to Create an Email QR Code
          </h2>

          <ol className="mt-4 list-decimal space-y-3 pl-6 text-base leading-7 text-secondary-600">
            <li>Enter the email address you want to use.</li>
            <li>Add a subject if needed.</li>
            <li>Enter a pre-filled email message.</li>
            <li>Customize your QR code if desired.</li>
            <li>Choose your preferred download format.</li>
            <li>Generate and download your Email QR code.</li>
          </ol>

          <h2 className="mt-10 text-2xl font-bold text-secondary-900">
            Why Use an Email QR Code?
          </h2>

          <p className="mt-4 text-base leading-7 text-secondary-600">
            Email QR codes make it easier for customers, clients, and visitors
            to contact you. Instead of typing an email address manually, users
            can simply scan the QR code and start composing an email
            immediately.
          </p>
        </section>
      )}
            {initialType === 'sms' && (
        <section className="mx-auto mt-12 max-w-4xl px-4 text-left">
          <h2 className="text-2xl font-bold text-secondary-900">
            What Is an SMS QR Code?
          </h2>

          <p className="mt-4 text-base leading-7 text-secondary-600">
            An SMS QR code lets people send a text message quickly by scanning
            a QR code with their smartphone. It can open a text message with a
            pre-filled phone number and message. FreeQRHub makes it easy to
            create a free SMS QR code in seconds.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-secondary-900">
            How to Create an SMS QR Code
          </h2>

          <ol className="mt-4 list-decimal space-y-3 pl-6 text-base leading-7 text-secondary-600">
            <li>Enter the phone number you want to receive the message.</li>
            <li>Enter the message you want to pre-fill.</li>
            <li>Customize the QR code if desired.</li>
            <li>Choose your preferred download format.</li>
            <li>Generate your SMS QR code.</li>
            <li>Download and share your QR code.</li>
          </ol>

          <h2 className="mt-10 text-2xl font-bold text-secondary-900">
            Why Use an SMS QR Code?
          </h2>

          <p className="mt-4 text-base leading-7 text-secondary-600">
            SMS QR codes make it easier for customers, clients, and visitors
            to send text messages. Instead of typing a phone number and
            message manually, users can simply scan the QR code and start
            composing an SMS quickly.
          </p>
        </section>
      )}
            {initialType === 'vcard' && (
        <section className="mx-auto mt-12 max-w-4xl px-4 text-left">
          <h2 className="text-2xl font-bold text-secondary-900">
            What Is a vCard QR Code?
          </h2>

          <p className="mt-4 text-base leading-7 text-secondary-600">
            A vCard QR code lets people share contact information instantly
            by scanning a QR code with their smartphone. It can store details
            such as a name, phone number, email address, company, and website.
            FreeQRHub makes it easy to create a free vCard QR code in seconds.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-secondary-900">
            How to Create a vCard QR Code
          </h2>

          <ol className="mt-4 list-decimal space-y-3 pl-6 text-base leading-7 text-secondary-600">
            <li>Enter the contact information you want to share.</li>
            <li>Add a phone number and email address if needed.</li>
            <li>Add company or website information if desired.</li>
            <li>Customize the QR code if desired.</li>
            <li>Choose your preferred download format.</li>
            <li>Generate and share your vCard QR code.</li>
          </ol>

          <h2 className="mt-10 text-2xl font-bold text-secondary-900">
            Why Use a vCard QR Code?
          </h2>

          <p className="mt-4 text-base leading-7 text-secondary-600">
            vCard QR codes make it easier to share contact details without
            manually typing names, phone numbers, or email addresses. They are
            useful for business cards, networking events, professionals,
            businesses, and personal contact sharing.
          </p>
        </section>
      )}
            {initialType === 'location' && (
        <section className="mx-auto mt-12 max-w-4xl px-4 text-left">
          <h2 className="text-2xl font-bold text-secondary-900">
            What Is a Location QR Code?
          </h2>

          <p className="mt-4 text-base leading-7 text-secondary-600">
            A Location QR code lets people share a specific place or
            destination by scanning a QR code with their smartphone. It can
            open a location in a maps application and make it easier for
            people to find a business, event, meeting place, or other
            destination. FreeQRHub makes it easy to create a free Location QR
            code in seconds.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-secondary-900">
            How to Create a Location QR Code
          </h2>

          <ol className="mt-4 list-decimal space-y-3 pl-6 text-base leading-7 text-secondary-600">
            <li>Enter the latitude and longitude of the location.</li>
            <li>Check that the location coordinates are correct.</li>
            <li>Customize the QR code if desired.</li>
            <li>Choose your preferred download format.</li>
            <li>Generate your Location QR code.</li>
            <li>Download and share your QR code.</li>
          </ol>

          <h2 className="mt-10 text-2xl font-bold text-secondary-900">
            Why Use a Location QR Code?
          </h2>

          <p className="mt-4 text-base leading-7 text-secondary-600">
            Location QR codes make it easier to share places and destinations
            without manually typing addresses or searching for locations.
            They are useful for businesses, restaurants, events, offices,
            stores, tourist attractions, and meeting places.
          </p>
        </section>
      )}
            {initialType === 'text' && (
        <section className="mx-auto mt-12 max-w-4xl px-4 text-left">
          <h2 className="text-2xl font-bold text-secondary-900">
            What Is a Text QR Code?
          </h2>

          <p className="mt-4 text-base leading-7 text-secondary-600">
            A Text QR code lets people share plain text information by
            scanning a QR code with their smartphone. It can store messages,
            instructions, notes, or other text that users can access quickly.
            FreeQRHub makes it easy to create a free Text QR code in seconds.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-secondary-900">
            How to Create a Text QR Code
          </h2>

          <ol className="mt-4 list-decimal space-y-3 pl-6 text-base leading-7 text-secondary-600">
            <li>Enter the text or message you want to share.</li>
            <li>Check that the text is correct.</li>
            <li>Customize the QR code if desired.</li>
            <li>Choose your preferred download format.</li>
            <li>Generate your Text QR code.</li>
            <li>Download and share your QR code.</li>
          </ol>

          <h2 className="mt-10 text-2xl font-bold text-secondary-900">
            Why Use a Text QR Code?
          </h2>

          <p className="mt-4 text-base leading-7 text-secondary-600">
            Text QR codes make it easier to share information without
            requiring users to type it manually. They are useful for
            instructions, announcements, product information, educational
            materials, event details, and other plain text content.
          </p>
        </section>
      )}
           

      {initialType === 'phone' && (
        <section className="mx-auto mt-12 max-w-4xl px-4 text-left">
          <h2 className="text-2xl font-bold text-secondary-900">
            What Is a Phone QR Code?
          </h2>

          <p className="mt-4 text-base leading-7 text-secondary-600">
            A Phone QR code lets people call a phone number instantly by
            scanning a QR code with their smartphone. Instead of manually
            typing a phone number, users can scan the code and start a call
            quickly. FreeQRHub makes it easy to create a free Phone QR code
            in seconds.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-secondary-900">
            How to Create a Phone QR Code
          </h2>

          <ol className="mt-4 list-decimal space-y-3 pl-6 text-base leading-7 text-secondary-600">
            <li>Enter the phone number you want people to call.</li>
            <li>Check that the phone number is correct.</li>
            <li>Customize the QR code if desired.</li>
            <li>Choose your preferred download format.</li>
            <li>Generate your Phone QR code.</li>
            <li>Download and share your QR code.</li>
          </ol>

          <h2 className="mt-10 text-2xl font-bold text-secondary-900">
            Why Use a Phone QR Code?
          </h2>

          <p className="mt-4 text-base leading-7 text-secondary-600">
            Phone QR codes make it easier for customers, clients, and
            businesses to share contact numbers. Users can simply scan the
            QR code and quickly start a phone call without typing the number
            manually.
          </p>
        </section>
      )}
    </motion.div>
  );
}