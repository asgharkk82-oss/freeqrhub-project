import type {
  EmailFormData,
  LocationFormData,
  PhoneFormData,
  QrFormData,
  QrTypeId,
  SmsFormData,
  UrlFormData,
  VCardFormData,
  WifiFormData,
} from '../types';

function escapeWifi(value: string = ''): string {
  return value.replace(/([\\;,":])/g, '\\$1');
}

function ensureUrlScheme(url: string): string {
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
}

export function buildQrContent(type: QrTypeId, data: QrFormData): string {
  switch (type) {
    case 'url': {
      const { url = '' } = data as Partial<UrlFormData>;
      return ensureUrlScheme(url.trim());
    }

    case 'text': {
      const { text = '' } = data as { text?: string };
      return text.trim();
    }

    case 'email': {
      const { email = '', subject = '', message = '' } = data as Partial<EmailFormData>;

      const params = new URLSearchParams();
      if (subject) params.set('subject', subject);
      if (message) params.set('body', message);

      const query = params.toString();

      return `mailto:${email.trim()}${query ? `?${query}` : ''}`;
    }

    case 'phone': {
      const { phone = '' } = data as Partial<PhoneFormData>;
      return `tel:${phone.trim()}`;
    }

    case 'sms': {
      const { phone = '', message = '' } = data as Partial<SmsFormData>;

      const params = new URLSearchParams();
      if (message) params.set('body', message);

      const query = params.toString();

      return `sms:${phone.trim()}${query ? `?${query}` : ''}`;
    }

    case 'wifi': {
      const {
        ssid = '',
        password = '',
        security = 'WPA',
        hidden = false,
      } = data as Partial<WifiFormData>;

      const t = security === 'nopass' ? 'nopass' : security;
      const p = security === 'nopass' ? '' : escapeWifi(password);

      return `WIFI:T:${t};S:${escapeWifi(ssid)};P:${p};${hidden ? 'H:true;' : ''};`;
    }

    case 'vcard': {
      const {
        name = '',
        phone = '',
        email = '',
        company = '',
        website = '',
      } = data as Partial<VCardFormData>;

      const lines = ['BEGIN:VCARD', 'VERSION:3.0'];

      if (name) lines.push(`FN:${name}`);
      if (company) lines.push(`ORG:${company}`);
      if (phone) lines.push(`TEL:${phone}`);
      if (email) lines.push(`EMAIL:${email}`);
      if (website) lines.push(`URL:${ensureUrlScheme(website)}`);

      lines.push('END:VCARD');

      return lines.join('\n');
    }

    case 'location': {
      const { latitude = '', longitude = '' } = data as Partial<LocationFormData>;

      return `geo:${latitude.trim()},${longitude.trim()}`;
    }

    default:
      return '';
  }
}

export function hasContent(type: QrTypeId, data: QrFormData): boolean {
  return buildQrContent(type, data).length > 0;
}