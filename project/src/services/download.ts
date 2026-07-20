import QRCodeStyling from 'qr-code-styling';
import { jsPDF } from 'jspdf';
import type { DownloadFormat, QrCustomization } from '../types';
import { SIZE_PIXELS } from '../constants';
import { buildFrameCanvas } from './frame-renderer';

interface DownloadOptions {
  qr: QRCodeStyling;
  format: DownloadFormat;
  customization: QrCustomization;
  fileName: string;
}

function toBlob(data: Blob | Buffer): Blob {
  if (data instanceof Blob) return data;
  return new Blob([new Uint8Array(data)], { type: 'image/png' });
}

function triggerDownload(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function downloadQrCode({ qr, format, customization, fileName }: DownloadOptions): Promise<void> {
  const size = SIZE_PIXELS[customization.size];

  if (format === 'svg') {
    const raw = await qr.getRawData('svg');
    if (!raw) throw new Error('Unable to generate SVG.');
    const blob = toBlob(raw);
    triggerDownload(blob, `${fileName}.svg`);
    return;
  }

  const rawPng = await qr.getRawData('png');
  if (!rawPng) throw new Error('Unable to generate QR image.');
  const pngBlob = toBlob(rawPng);

  if (format === 'png') {
    if (customization.frameStyle !== 'none') {
      const framedBlob = await buildFrameCanvas(pngBlob, customization, size, 'png');
      triggerDownload(framedBlob, `${fileName}.png`);
    } else {
      triggerDownload(pngBlob, `${fileName}.png`);
    }
    return;
  }

  if (format === 'pdf') {
    let blobToEmbed: Blob = pngBlob;
    if (customization.frameStyle !== 'none') {
      blobToEmbed = await buildFrameCanvas(pngBlob, customization, size, 'png');
    }
    const dataUrl = await blobToDataURL(blobToEmbed);
    const pdf = new jsPDF({ unit: 'px', format: [size, size], hotfixes: ['px_scaling'] });
    pdf.addImage(dataUrl, 'PNG', 0, 0, size, size);
    pdf.save(`${fileName}.pdf`);
  }
}

function blobToDataURL(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read image data'));
    reader.readAsDataURL(blob);
  });
}
