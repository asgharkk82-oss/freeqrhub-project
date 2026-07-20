import { ACCEPTED_LOGO_TYPES, MAX_LOGO_SIZE_MB } from '../constants';

export interface LogoValidationResult {
  dataUrl: string | null;
  error: string | null;
}

export function processLogoUpload(file: File): Promise<LogoValidationResult> {
  if (!ACCEPTED_LOGO_TYPES.includes(file.type)) {
    return Promise.resolve({
      dataUrl: null,
      error: 'Unsupported format. Please upload a PNG, JPG or SVG file.',
    });
  }

  if (file.size > MAX_LOGO_SIZE_MB * 1024 * 1024) {
    return Promise.resolve({
      dataUrl: null,
      error: `File is too large. Maximum size is ${MAX_LOGO_SIZE_MB}MB.`,
    });
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({ dataUrl: reader.result as string, error: null });
    };
    reader.onerror = () => {
      resolve({ dataUrl: null, error: 'Unable to read the uploaded file. Please try again.' });
    };
    reader.readAsDataURL(file);
  });
}
