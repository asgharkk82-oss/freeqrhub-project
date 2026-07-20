import { useEffect } from 'react';

interface SeoOptions {
  title?: string;
  description?: string;
  canonical?: string;
  schema?: object;
}

function setMeta(selector: string, attribute: string, value: string) {
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    const [, attr] = selector.match(/\[(.+?)="(.+?)"\]/) ?? [];
    if (attr) {
      el.setAttribute(attr, selector.match(/"(.+?)"/)?.[1] ?? attr);
    }
    document.head.appendChild(el);
  }
  el.setAttribute(attribute, value);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

const DEFAULT_TITLE = 'FreeQRHub - Free QR Code Generator';
const DEFAULT_DESCRIPTION =
  'Create beautiful customizable QR codes instantly. Free QR code generator with no signup, no watermark and fast downloads.';

export function useSeo({
  title,
  description,
  canonical,
  schema,
}: SeoOptions) {
  useEffect(() => {
    document.title = title ? `${title} | FreeQRHub` : DEFAULT_TITLE;

    const desc = description ?? DEFAULT_DESCRIPTION;
    setMeta('meta[name="description"]', 'content', desc);
    setMeta('meta[property="og:description"]', 'content', desc);
    setMeta('meta[name="twitter:description"]', 'content', desc);

    const fullTitle = title ? `${title} | FreeQRHub` : DEFAULT_TITLE;
    setMeta('meta[property="og:title"]', 'content', fullTitle);
    setMeta('meta[name="twitter:title"]', 'content', fullTitle);

    if (canonical) {
      setLink('canonical', canonical);
      setMeta('meta[property="og:url"]', 'content', canonical);
    }
    if (schema) {
  let script = document.getElementById(
    'dynamic-schema'
  ) as HTMLScriptElement | null;

  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'dynamic-schema';
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(schema);
}
  }, [title, description, canonical, schema]);
}
