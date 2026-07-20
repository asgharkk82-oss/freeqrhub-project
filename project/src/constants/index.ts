import type {
  BlogPost,
  FaqItem,
  Feature,
  NavItem,
  QrCustomization,
  QrTypeDefinition,
} from '../types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'QR Generator', href: '/generator' },
  { label: 'Features', href: '/#features' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

export const QR_TYPES: QrTypeDefinition[] = [
  { id: 'url', title: 'URL', description: 'Link to a website', iconName: 'Link' },
  { id: 'text', title: 'Text', description: 'Plain text message', iconName: 'Type' },
  { id: 'email', title: 'Email', description: 'Pre-filled email', iconName: 'Mail' },
  { id: 'phone', title: 'Phone', description: 'Click-to-call number', iconName: 'Phone' },
  { id: 'sms', title: 'SMS', description: 'Pre-filled text message', iconName: 'MessageSquare' },
  { id: 'wifi', title: 'WiFi', description: 'Network credentials', iconName: 'Wifi' },
  { id: 'vcard', title: 'vCard', description: 'Contact card', iconName: 'Contact' },
  { id: 'location', title: 'Location', description: 'GPS coordinates', iconName: 'MapPin' },
];

export const DEFAULT_CUSTOMIZATION: QrCustomization = {
  foregroundColor: '#0F172A',
  backgroundColor: '#FFFFFF',
  dotStyle: 'rounded',
  cornerStyle: 'rounded',
  size: 'medium',
  margin: 4,
  errorCorrection: 'H',
  frameStyle: 'none',
  frameText: 'Scan Me',
  logoDataUrl: null,
  logoSize: 0.28,
};

export const SIZE_PIXELS: Record<QrCustomization['size'], number> = {
  small: 200,
  medium: 280,
  large: 360,
};

export const PRESET_FOREGROUND_COLORS = [
  '#0F172A',
  '#2563EB',
  '#14B8A6',
  '#7C3AED',
  '#DC2626',
  '#EA580C',
  '#0D9488',
  '#1E293B',
];

export const PRESET_BACKGROUND_COLORS = [
  '#FFFFFF',
  '#F8FAFC',
  '#FEF3C7',
  '#DBEAFE',
  '#CCFBF1',
  '#FCE7F3',
];

export const DOT_STYLE_OPTIONS = [
  { value: 'square', label: 'Square' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'circle', label: 'Circle' },
] as const;

export const CORNER_STYLE_OPTIONS = [
  { value: 'square', label: 'Square' },
  { value: 'rounded', label: 'Rounded' },
] as const;

export const ERROR_CORRECTION_OPTIONS = [
  { value: 'L', label: 'Low (7%)' },
  { value: 'M', label: 'Medium (15%)' },
  { value: 'Q', label: 'Quartile (25%)' },
  { value: 'H', label: 'High (30%)' },
] as const;

export const SIZE_OPTIONS = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
] as const;

export const FRAME_OPTIONS = [
  { value: 'none', label: 'No Frame' },
  { value: 'basic', label: 'Basic Frame' },
  { value: 'rounded', label: 'Rounded Frame' },
  { value: 'business', label: 'Business Frame' },
] as const;

export const FRAME_TEXT_PRESETS = ['Scan Me', 'Visit Website', 'Follow Us', 'Contact Us'];

export const WIFI_SECURITY_OPTIONS = [
  { value: 'WPA', label: 'WPA/WPA2' },
  { value: 'WEP', label: 'WEP' },
  { value: 'nopass', label: 'Open Network' },
] as const;

export const DOWNLOAD_FORMATS = [
  { value: 'png', label: 'PNG', description: 'Best for web & print' },
  { value: 'svg', label: 'SVG', description: 'Scalable vector' },
  { value: 'pdf', label: 'PDF', description: 'Document format' },
] as const;

export const TRUST_INDICATORS = [
  'No Signup Required',
  'No Watermarks',
  'Free Forever',
];

export const FEATURES: Feature[] = [
  {
    icon: 'Zap',
    title: 'Instant QR Code Generation',
    description: 'Generate professional QR codes instantly with lightning-fast performance.',
  },
  {
    icon: 'Palette',
    title: 'Unlimited Customization',
    description: 'Customize colors, frames, dot styles, corners and branding in seconds.',
  },
  {
    icon: 'Download',
    title: 'High Quality Downloads',
    description: 'Download QR codes in PNG, SVG and PDF with crystal-clear resolution.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Privacy First',
    description: 'Your data never leaves your browser. No tracking. No storage.',
  },
  {
    icon: 'Smartphone',
    title: 'Fully Responsive',
    description: 'Works perfectly on desktop, tablet and mobile devices.',
  },
  {
    icon: 'Image',
    title: 'Custom Logo Support',
    description: 'Upload your business logo and create beautiful branded QR codes.',
  },
];

export const WHY_CHOOSE: Feature[] = [
  {
    icon: 'Gift',
    title: '100% Free Forever',
    description: 'Generate unlimited QR codes without subscriptions or hidden fees.',
  },
  {
    icon: 'UserX',
    title: 'No Registration Needed',
    description: 'Start creating QR codes instantly without creating an account.',
  },
  {
    icon: 'Gauge',
    title: 'Lightning Fast',
    description: 'Professional QR codes generated within seconds.',
  },
  {
    icon: 'Lock',
    title: 'Private & Secure',
    description: 'Your QR data stays private and is never stored on our servers.',
  },
  {
    icon: 'Smartphone',
    title: 'Works on Every Device',
    description: 'Fully optimized for desktop, tablet and mobile users.',
  },
  {
    icon: 'FileOutput',
    title: 'Multiple Export Formats',
    description: 'Download QR codes in PNG, SVG and PDF with high resolution.',
  },
];
export const HOW_IT_WORKS = [
  { icon: 'ListChecks', title: 'Select QR Type', description: 'Choose from 8 QR code types.' },
  { icon: 'Keyboard', title: 'Enter Content', description: 'Fill in the details for your code.' },
  { icon: 'SlidersHorizontal', title: 'Customize', description: 'Style colors, dots and frames.' },
  { icon: 'Download', title: 'Download', description: 'Export in PNG, SVG or PDF.' },
];

export const FAQS: FaqItem[] = [
  { question: 'What is a QR Code?', answer: 'A QR (Quick Response) code is a two-dimensional barcode that stores information such as URLs, text, contact details or WiFi credentials. When scanned with a smartphone camera, it instantly displays or opens the encoded content.' },
  { question: 'Is FreeQRHub free?', answer: 'Yes. FreeQRHub is 100% free with no hidden charges. You can generate, customize and download unlimited QR codes without ever entering payment details.' },
  { question: 'Do I need an account?', answer: 'No account is required. You can start creating QR codes immediately — just open the generator, enter your content and download.' },
  { question: 'Can I customize QR codes?', answer: 'Absolutely. You can change foreground and background colors, dot styles, corner styles, error correction level, margins, add frames and embed your logo.' },
  { question: 'Can I download QR codes?', answer: 'Yes. Every QR code can be downloaded in high-resolution PNG, scalable SVG or PDF format — all free with no watermark.' },
  { question: 'Are QR codes permanent?', answer: 'Static QR codes (which is what FreeQRHub creates) are permanent — the content is encoded directly into the code and never changes. As long as the destination exists, your QR code will keep working.' },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'complete-guide-to-qr-codes',
    title: 'The Complete Guide to QR Codes in 2026',
    description: 'Everything you need to know about QR codes — from the different types to best practices for design and scanning reliability.',
    image: 'https://images.pexels.com/photos/6141172/pexels-photo-6141172.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2026-07-10',
    readTime: '8 min read',
  },
  {
    slug: 'qr-codes-for-small-business',
    title: 'How Small Businesses Use QR Codes to Grow',
    description: 'Discover five practical ways local businesses are using QR codes to boost engagement, collect reviews and drive sales.',
    image: 'https://images.pexels.com/photos/5077047/pexels-photo-5077047.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2026-07-05',
    readTime: '6 min read',
  },
  {
    slug: 'qr-code-design-best-practices',
    title: 'QR Code Design Best Practices for Maximum Scans',
    description: 'Learn how contrast, error correction and logo placement affect scannability — and how to design codes that look great and still work.',
    image: 'https://images.pexels.com/photos/4968391/pexels-photo-4968391.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2026-06-28',
    readTime: '5 min read',
  },
];

export const FOOTER_LINKS = {
qrTypes: [
  { label: 'URL QR Code', href: '/url-qr-code-generator' },
  { label: 'WiFi QR Code', href: '/wifi-qr-code-generator' },
  { label: 'Email QR Code', href: '/email-qr-code-generator' },
  { label: 'vCard QR Code', href: '/vcard-qr-code-generator' },
],
  features: [
    { label: 'Customization', href: '/#features' },
    { label: 'Multiple Formats', href: '/#features' },
    { label: 'Logo Embedding', href: '/#features' },
    { label: 'Privacy First', href: '/#features' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Blog', href: '/blog' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

export const BRAND = {
  name: 'FreeQRHub',
  tagline: 'The fastest, simplest and most private free QR code generator on the internet.',
};

export const MAX_LOGO_SIZE_MB = 2;
export const ACCEPTED_LOGO_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
export const HISTORY_STORAGE_KEY = 'freeqrhub:history';
export const MAX_HISTORY_ITEMS = 12;
