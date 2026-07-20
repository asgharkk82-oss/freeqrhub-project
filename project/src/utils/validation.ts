import { z } from 'zod';

export const urlSchema = z.object({
  url: z
    .string()
    .min(1, 'Website URL is required')
    .refine((v) => {
      try {
        const withScheme = /^https?:\/\//i.test(v) ? v : `https://${v}`;
        new URL(withScheme);
        return true;
      } catch {
        return false;
      }
    }, 'Enter a valid URL, e.g. https://example.com'),
});

export const textSchema = z.object({
  text: z.string().min(1, 'Text content is required').max(1000, 'Text is too long (max 1000 characters)'),
});

export const emailSchema = z.object({
  email: z.string().min(1, 'Email address is required').email('Enter a valid email address'),
  subject: z.string().max(200, 'Subject is too long').optional().default(''),
  message: z.string().max(1000, 'Message is too long').optional().default(''),
});

export const phoneSchema = z.object({
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^[+]?[\d\s()-]{4,20}$/, 'Enter a valid phone number'),
});

export const smsSchema = z.object({
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^[+]?[\d\s()-]{4,20}$/, 'Enter a valid phone number'),
  message: z.string().max(160, 'Message is too long (max 160 characters)').optional().default(''),
});

export const wifiSchema = z.object({
  ssid: z.string().min(1, 'Network name is required').max(32, 'Network name is too long'),
  password: z.string().max(63, 'Password is too long'),
  security: z.enum(['WPA', 'WPA2', 'WEP', 'nopass']),
  hidden: z.boolean().optional().default(false),
});

export const vcardSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z
    .string()
    .optional()
    .default('')
    .refine((v) => v === '' || /^[+]?[\d\s()-]{4,20}$/.test(v), 'Enter a valid phone number'),
  email: z
    .string()
    .optional()
    .default('')
    .refine((v) => v === '' || z.string().email().safeParse(v).success, 'Enter a valid email'),
  company: z.string().max(100).optional().default(''),
  website: z
    .string()
    .optional()
    .default('')
    .refine((v) => {
      if (!v) return true;
      try {
        new URL(/^https?:\/\//i.test(v) ? v : `https://${v}`);
        return true;
      } catch {
        return false;
      }
    }, 'Enter a valid website URL'),
});

export const locationSchema = z.object({
  latitude: z
    .string()
    .min(1, 'Latitude is required')
    .refine((v) => {
      const n = parseFloat(v);
      return !Number.isNaN(n) && n >= -90 && n <= 90;
    }, 'Latitude must be between -90 and 90'),
  longitude: z
    .string()
    .min(1, 'Longitude is required')
    .refine((v) => {
      const n = parseFloat(v);
      return !Number.isNaN(n) && n >= -180 && n <= 180;
    }, 'Longitude must be between -180 and 180'),
});
