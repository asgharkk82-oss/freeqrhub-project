export type QrTypeId =
  | 'url'
  | 'text'
  | 'email'
  | 'phone'
  | 'sms'
  | 'wifi'
  | 'vcard'
  | 'location';

export interface QrTypeDefinition {
  id: QrTypeId;
  title: string;
  description: string;
  iconName: string;
}

export interface UrlFormData {
  url: string;
}

export interface TextFormData {
  text: string;
}

export interface EmailFormData {
  email: string;
  subject: string;
  message: string;
}

export interface PhoneFormData {
  phone: string;
}

export interface SmsFormData {
  phone: string;
  message: string;
}

export interface WifiFormData {
  ssid: string;
  password: string;
  security: 'WPA' | 'WPA2' | 'WEP' | 'nopass';
  hidden: boolean;
}

export interface VCardFormData {
  name: string;
  phone: string;
  email: string;
  company: string;
  website: string;
}

export interface LocationFormData {
  latitude: string;
  longitude: string;
}

export type QrFormData =
  | UrlFormData
  | TextFormData
  | EmailFormData
  | PhoneFormData
  | SmsFormData
  | WifiFormData
  | VCardFormData
  | LocationFormData;

export type DotStyle = 'square' | 'rounded' | 'circle';
export type CornerStyle = 'square' | 'rounded';
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';
export type QrSize = 'small' | 'medium' | 'large';
export type FrameStyle = 'none' | 'basic' | 'rounded' | 'business';
export type DownloadFormat = 'png' | 'svg' | 'pdf';

export interface QrCustomization {
  foregroundColor: string;
  backgroundColor: string;
  dotStyle: DotStyle;
  cornerStyle: CornerStyle;
  size: QrSize;
  margin: number;
  errorCorrection: ErrorCorrectionLevel;
  frameStyle: FrameStyle;
  frameText: string;
  logoDataUrl: string | null;
  logoSize: number;
}

export interface QrHistoryItem {
  id: string;
  type: QrTypeId;
  content: string;
  previewDataUrl: string;
  customization: QrCustomization;
  createdAt: number;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  image: string;
  date: string;
  readTime: string;

  content: string;
  category: string;
  author: string;

  keywords?: string[];
}

export interface NavItem {
  label: string;
  href: string;
}
