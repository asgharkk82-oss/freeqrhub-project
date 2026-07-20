import type { QrCustomization } from '../types';

/**
 * Renders a QR code PNG blob onto a canvas with an optional frame and
 * caption text below the code. Used for PNG and PDF exports.
 */
export async function buildFrameCanvas(
  qrPngBlob: Blob,
  customization: QrCustomization,
  qrSize: number,
  output: 'png' | 'canvas',
): Promise<Blob> {
  const img = await blobToImage(qrPngBlob);
  const caption = customization.frameText || 'Scan Me';

  const padding = Math.round(qrSize * 0.08);
  const captionHeight = Math.round(qrSize * 0.16);
  const borderRadius = customization.frameStyle === 'rounded' || customization.frameStyle === 'business'
    ? Math.round(qrSize * 0.06)
    : 0;

  const totalWidth = qrSize + padding * 2;
  const totalHeight = qrSize + padding * 2 + captionHeight;

  const canvas = document.createElement('canvas');
  canvas.width = totalWidth;
  canvas.height = totalHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not supported');

  // Background
  ctx.fillStyle = customization.backgroundColor;
  if (borderRadius > 0) {
    roundRect(ctx, 0, 0, totalWidth, totalHeight, borderRadius);
    ctx.fill();
  } else {
    ctx.fillRect(0, 0, totalWidth, totalHeight);
  }

  // QR code
  ctx.drawImage(img, padding, padding, qrSize, qrSize);

  // Caption
  ctx.fillStyle = customization.foregroundColor;
  ctx.font = `600 ${Math.round(qrSize * 0.08)}px Inter, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(caption, totalWidth / 2, padding + qrSize + captionHeight / 2);

  if (output === 'canvas') {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('Failed to export canvas'))), 'image/png');
    });
  }

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('Failed to export PNG'))), 'image/png');
  });
}

function blobToImage(blob: Blob): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(blob);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load QR image'));
    };
    img.src = url;
  });
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
