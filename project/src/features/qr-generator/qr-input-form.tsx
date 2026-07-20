import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import type { FieldErrors, Resolver } from 'react-hook-form';
import type { QrFormData, QrTypeId } from '../../types';
import {
  emailSchema,
  locationSchema,
  phoneSchema,
  smsSchema,
  textSchema,
  urlSchema,
  vcardSchema,
  wifiSchema,
} from '../../utils/validation';
import { Field, Input, Textarea } from '../../components/ui/input';
import { Select } from '../../components/ui/select';
import { WIFI_SECURITY_OPTIONS } from '../../constants';

interface QrInputFormProps {
  type: QrTypeId;
  onContentChange: (data: QrFormData) => void;
}

const emptyDefaults: Record<QrTypeId, QrFormData> = {
  url: { url: '' },
  text: { text: '' },
  email: { email: '', subject: '', message: '' },
  phone: { phone: '' },
  sms: { phone: '', message: '' },
  wifi: { ssid: '', password: '', security: 'WPA', hidden: false },
  vcard: { name: '', phone: '', email: '', company: '', website: '' },
  location: { latitude: '', longitude: '' },
};

function getResolver(type: QrTypeId): Resolver<QrFormData> {
  switch (type) {
    case 'url': return zodResolver(urlSchema) as unknown as Resolver<QrFormData>;
    case 'text': return zodResolver(textSchema) as unknown as Resolver<QrFormData>;
    case 'email': return zodResolver(emailSchema) as unknown as Resolver<QrFormData>;
    case 'phone': return zodResolver(phoneSchema) as unknown as Resolver<QrFormData>;
    case 'sms': return zodResolver(smsSchema) as unknown as Resolver<QrFormData>;
    case 'wifi': return zodResolver(wifiSchema) as unknown as Resolver<QrFormData>;
    case 'vcard': return zodResolver(vcardSchema) as unknown as Resolver<QrFormData>;
    case 'location': return zodResolver(locationSchema) as unknown as Resolver<QrFormData>;
  }
}

function err(errors: FieldErrors, field: string): string | undefined {
  return (errors as Record<string, { message?: string }>)[field]?.message;
}

export function QrInputForm({ type, onContentChange }: QrInputFormProps) {
  const {
    register,
    watch,
    formState: { errors },
    reset,
  } = useForm<QrFormData>({
    resolver: getResolver(type),
    defaultValues: emptyDefaults[type],
    mode: 'onChange',
  });

  useEffect(() => {
    reset(emptyDefaults[type]);
  }, [type, reset]);

  useEffect(() => {
    const subscription = watch((value) => {
      onContentChange(value as QrFormData);
    });
    return () => subscription.unsubscribe();
  }, [watch, onContentChange]);

  return (
    <div className="space-y-4">
      {type === 'url' && (
        <Field label="Website URL" htmlFor="url" error={err(errors, 'url')} required>
          <Input id="url" placeholder="https://example.com" error={!!err(errors, 'url')} {...register('url')} />
        </Field>
      )}

      {type === 'text' && (
        <Field label="Text Content" htmlFor="text" error={err(errors, 'text')} required>
          <Textarea
            id="text"
            placeholder="Enter any text, message or note..."
            error={!!err(errors, 'text')}
            {...register('text')}
          />
        </Field>
      )}

      {type === 'email' && (
        <>
          <Field label="Email Address" htmlFor="email" error={err(errors, 'email')} required>
            <Input id="email" type="email" placeholder="hello@example.com" error={!!err(errors, 'email')} {...register('email')} />
          </Field>
          <Field label="Subject" htmlFor="subject" error={err(errors, 'subject')}>
            <Input id="subject" placeholder="Email subject" {...register('subject')} />
          </Field>
          <Field label="Message" htmlFor="message" error={err(errors, 'message')}>
            <Textarea id="message" placeholder="Email body..." {...register('message')} />
          </Field>
        </>
      )}

      {type === 'phone' && (
        <Field label="Phone Number" htmlFor="phone" error={err(errors, 'phone')} required>
          <Input id="phone" type="tel" placeholder="+1 555 123 4567" error={!!err(errors, 'phone')} {...register('phone')} />
        </Field>
      )}

      {type === 'sms' && (
        <>
          <Field label="Phone Number" htmlFor="sms-phone" error={err(errors, 'phone')} required>
            <Input id="sms-phone" type="tel" placeholder="+1 555 123 4567" error={!!err(errors, 'phone')} {...register('phone')} />
          </Field>
          <Field label="Message" htmlFor="sms-message" error={err(errors, 'message')}>
            <Textarea id="sms-message" placeholder="Pre-filled text message..." {...register('message')} />
          </Field>
        </>
      )}

      {type === 'wifi' && (
        <>
          <Field label="Network Name (SSID)" htmlFor="ssid" error={err(errors, 'ssid')} required>
            <Input id="ssid" placeholder="MyWiFiNetwork" error={!!err(errors, 'ssid')} {...register('ssid')} />
          </Field>
          <Field label="Password" htmlFor="password" error={err(errors, 'password')}>
            <Input id="password" type="text" placeholder="Network password" {...register('password')} />
          </Field>
          <Field label="Security Type" htmlFor="security">
            <Select id="security" {...register('security')}>
              {WIFI_SECURITY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </Select>
          </Field>
          <label className="flex items-center gap-2 text-sm text-secondary-600">
            <input type="checkbox" className="h-4 w-4 rounded border-secondary-300 text-primary-600" {...register('hidden')} />
            Hidden network
          </label>
        </>
      )}

      {type === 'vcard' && (
        <>
          <Field label="Name" htmlFor="name" error={err(errors, 'name')} required>
            <Input id="name" placeholder="John Doe" error={!!err(errors, 'name')} {...register('name')} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Phone" htmlFor="vcard-phone" error={err(errors, 'phone')}>
              <Input id="vcard-phone" type="tel" placeholder="+1 555 123 4567" {...register('phone')} />
            </Field>
            <Field label="Email" htmlFor="vcard-email" error={err(errors, 'email')}>
              <Input id="vcard-email" type="email" placeholder="john@example.com" {...register('email')} />
            </Field>
          </div>
          <Field label="Company" htmlFor="company" error={err(errors, 'company')}>
            <Input id="company" placeholder="Acme Inc." {...register('company')} />
          </Field>
          <Field label="Website" htmlFor="website" error={err(errors, 'website')}>
            <Input id="website" placeholder="https://example.com" {...register('website')} />
          </Field>
        </>
      )}

      {type === 'location' && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Latitude" htmlFor="latitude" error={err(errors, 'latitude')} required>
            <Input id="latitude" placeholder="40.7128" error={!!err(errors, 'latitude')} {...register('latitude')} />
          </Field>
          <Field label="Longitude" htmlFor="longitude" error={err(errors, 'longitude')} required>
            <Input id="longitude" placeholder="-74.0060" error={!!err(errors, 'longitude')} {...register('longitude')} />
          </Field>
        </div>
      )}
    </div>
  );
}
