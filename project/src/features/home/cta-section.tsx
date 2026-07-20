import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, QrCode as QrCodeIcon } from 'lucide-react';
import { Button } from '../../components/ui/button';

export function CtaSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-base">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-secondary-900 px-6 py-16 text-center sm:px-12 sm:py-20"
        >
          {/* Decorative glows */}
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary-600/20 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-accent-500/20 blur-3xl" aria-hidden="true" />

          <div className="relative">
            <h2 className="text-display-sm font-bold text-white sm:text-display-md text-balance">
              Ready to Create Your QR Code?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-secondary-300 text-balance">
              Join thousands of users creating beautiful QR codes for free. No signup, no watermark, no limits.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/generator">
                <Button size="xl" className="w-full sm:w-auto">
                  <QrCodeIcon className="h-5 w-5" />
                  Generate Free QR Code
                </Button>
              </Link>
              <Link to="/#features">
                <Button variant="outline" size="xl" className="w-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white sm:w-auto">
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
