import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, QrCode as QrCodeIcon, Sparkles } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { LazyQrPreview } from '../../components/common/lazy-qr-preview';
import { HeroBackground } from '../../components/common/hero-background';
import { TRUST_INDICATORS, DEFAULT_CUSTOMIZATION } from '../../constants';

const DEMO_CONTENT = 'https://freeqrhub-project.vercel.app';

export function HeroSection() {
  return (
    <section className="relative overflow-x-hidden overflow-y-visible bg-gradient-hero isolate">
      <HeroBackground />
     <div className="container-base relative z-10 w-full max-w-full overflow-hidden px-5 py-16 sm:px-6 sm:py-20 lg:py-32 xl:py-40">
        <div className="grid min-w-0 grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left: Copy */}
         <div className="order-1 min-w-0 max-w-full text-center lg:order-1 lg:text-left">
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
            className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-secondary-900 break-words sm:text-5xl lg:text-7xl"
            >
             Create Free{' '}
<span className="text-gradient">QR Codes</span>{' '}
Online in Seconds
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-6 w-full max-w-xl px-1 text-base leading-7 text-secondary-500 sm:px-4 sm:text-lg lg:mx-0 lg:px-0"
            >
           Create free QR codes online for URLs, WiFi, vCard, email, phone, SMS, location, text and social media. Customize colors, logos and styles, then download high-quality QR codes instantly with no signup or watermark.
            </motion.p>

            <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.25 }}
  className="mt-10 flex w-full flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start"
>
  <Link to="/generator" className="w-full sm:w-auto">
    <Button
      size="xl"
      className="w-full sm:w-auto sm:min-w-[220px] shadow-lg transition-all duration-300 hover:shadow-xl"
    >
      <QrCodeIcon className="h-5 w-5" />
      Generate Free QR Code
    </Button>
  </Link>

  <Link to="/#features" className="w-full sm:w-auto">
    <Button
      variant="outline"
      size="xl"
      className="w-full sm:w-auto sm:min-w-[220px]"
    >
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
          className="order-2 relative mx-auto min-w-0 w-[calc(100%-1rem)] max-w-sm sm:w-full sm:max-w-md lg:order-2 lg:w-full lg:max-w-none"
          >
            <motion.div
  animate={{ y: [0, -8, 0] }}
  transition={{
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut',
  }}
  className="absolute -top-5 -right-4 z-20 hidden rounded-2xl bg-white px-4 py-3 shadow-xl lg:block"
>
  <p className="text-xs text-secondary-500">Downloads</p>
  <p className="text-lg font-bold text-primary-600">
  Free Downloads
</p>

<p className="mt-1 text-xs text-secondary-500">
  No Signup Required
</p>
</motion.div>
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary-200/30 to-accent-200/30 blur-2xl" aria-hidden="true" />
            <div className="relative min-w-0 max-w-full overflow-hidden rounded-3xl border border-white/40 bg-white/90 p-5 shadow-2xl backdrop-blur-xl sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-error/40" />
                  <span className="h-3 w-3 rounded-full bg-warning/40" />
                  <span className="h-3 w-3 rounded-full bg-success/40" />
                </div>
                <span className="truncate text-xs font-medium text-secondary-400">
  freeqrhub.com
</span>
              </div>
              <div className="relative mx-auto flex aspect-square w-full min-w-0 max-w-full items-center justify-center rounded-2xl bg-gradient-to-br from-slate-50 via-white to-primary-50 p-5 sm:p-8">
                <LazyQrPreview
                  content={DEMO_CONTENT}
                  customization={DEFAULT_CUSTOMIZATION}
                  className="h-full w-full"
                />
              </div>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
  {['PNG', 'SVG', 'Print Ready'].map((item) => (
    <span
      key={item}
      className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700"
    >
      ✓ {item}
    </span>
  ))}
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
