import QRCodeStyling from 'qr-code-styling';
import type { Options } from 'qr-code-styling';
import type { DotStyle, QrCustomization } from '../types';
import { SIZE_PIXELS } from '../constants';

const dotTypeMap: Record<DotStyle, Options['dotsOptions']> = {
  square: { type: 'square' },
  rounded: { type: 'rounded' },
  circle: { type: 'dots' },
};

const cornerSquareTypeMap: Record<QrCustomization['cornerStyle'], NonNullable<Options['cornersSquareOptions']>['type']> = {
  square: 'square',
  rounded: 'extra-rounded',
};

const cornerDotTypeMap: Record<QrCustomization['cornerStyle'], NonNullable<Options['cornersDotOptions']>['type']> = {
  square: 'square',
  rounded: 'dot',
};

interface CreateQrOptions {
  content: string;
  customization: QrCustomization;
  sizeOverride?: number;
}

/**
 * Creates a configured QRCodeStyling instance.
 * Logo embedding is supported but constrained by error correction
 * so scanning reliability is preserved.
 */
export function createQrCode({ content, customization, sizeOverride }: CreateQrOptions): QRCodeStyling {
  const size = sizeOverride ?? SIZE_PIXELS[customization.size];

  const options: Options = {
    width: size,
    height: size,
   type: 'svg',
   data: content,
    margin: customization.margin,
   qrOptions: {
  errorCorrectionLevel: 'M',
},
    dotsOptions: {
      color: customization.foregroundColor,
      ...dotTypeMap[customization.dotStyle],
    },
    backgroundOptions: {
      color: customization.backgroundColor,
    },
    cornersSquareOptions: {
      color: customization.foregroundColor,
      type: cornerSquareTypeMap[customization.cornerStyle],
    },
    cornersDotOptions: {
      color: customization.foregroundColor,
      type: cornerDotTypeMap[customization.cornerStyle],
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: customization.logoSize,
      margin: 2,
      crossOrigin: 'anonymous',
    },
  };

  if (customization.logoDataUrl) {
    options.image = customization.logoDataUrl;
  }

  return new QRCodeStyling(options);
}

/**
 * Generates a PNG data URL synchronously from a QR code instance.
 * qr-code-styling uses a canvas under the hood for PNG export.
 */
export async function getQrDataUrl(qr: QRCodeStyling, size: number): Promise<string> {
  return new Promise((resolve, reject) => {
    qr.getRawData('png')
      .then((raw) => {
        if (!raw) {
          reject(new Error('Failed to generate QR data'));
          return;
        }
        const blob = raw instanceof Blob ? raw : new Blob([new Uint8Array(raw)], { type: 'image/png' });
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error('Failed to read QR data'));
        reader.readAsDataURL(blob);
      })
      .catch(reject);
  });
  void size;
}
