import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, QrCode as QrCodeIcon, Sparkles } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { LazyQrPreview } from '../../components/common/lazy-qr-preview';
import { TRUST_INDICATORS, DEFAULT_CUSTOMIZATION } from '../../constants';

const DEMO_CONTENT = 'https://freeqrhub.com';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 bg-grid-pattern opacity-40" aria-hidden="true" />
      <div className="container-base relative section-padding lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: Copy */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3.5 py-1.5 text-sm font-medium text-primary-700"
            >
              <Sparkles className="h-4 w-4" />
              Free forever. No signup required.
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-6 text-display-md font-extrabold tracking-tight text-secondary-900 sm:text-display-lg text-balance"
            >
              Create Beautiful{' '}
              <span className="text-gradient">QR Codes</span> Instantly
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-secondary-500 lg:mx-0 text-balance"
            >
              Generate customizable QR codes for links, businesses, marketing and everyday use. Free, fast and privacy friendly.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
>
                <Link to="/generator">
  <Button size="xl" className="w-full sm:w-auto">
    <QrCodeIcon className="h-5 w-5" />
    Generate Free QR Code
  </Button>
</Link>

<Link to="/#features">
  <Button variant="outline" size="xl" className="w-full sm:w-auto">
    Explore Features
    <ArrowRight className="h-4 w-4" />
  </Button>
</Link>         
            </motion.div>

            {/* Trust indicators */}
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:justify-start"
            >
              {TRUST_INDICATORS.map((indicator) => (
                <li key={indicator} className="flex items-center gap-1.5 text-sm font-medium text-secondary-600">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success/10">
                    <Check className="h-3 w-3 text-success" strokeWidth={3} />
                  </span>
                  {indicator}
                </li>
              ))}
            </motion.ul>
            

          </div>

          {/* Right: Preview card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary-200/30 to-accent-200/30 blur-2xl" aria-hidden="true" />
            <div className="relative rounded-3xl border border-secondary-200 bg-white p-6 shadow-card-hover">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-error/40" />
                  <span className="h-3 w-3 rounded-full bg-warning/40" />
                  <span className="h-3 w-3 rounded-full bg-success/40" />
                </div>
                <span className="text-xs font-medium text-secondary-400">freeqrhub.com</span>
              </div>
              <div className="flex aspect-square items-center justify-center rounded-2xl bg-surface p-8">
                <LazyQrPreview
                  content={DEMO_CONTENT}
                  customization={DEFAULT_CUSTOMIZATION}
                  className="h-full w-full"
                />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {['URL', 'WiFi', 'vCard'].map((t) => (
                  <div key={t} className="rounded-lg bg-secondary-100 py-2 text-center text-xs font-medium text-secondary-500">
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
