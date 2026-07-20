import { motion } from 'framer-motion';
import { useSeo } from '../hooks/useSeo';
import { SectionHeading } from '../components/ui/section-heading';
import { Card } from '../components/ui/card';
import { getLucideIcon } from '../utils/icons';

const VALUES = [
  { icon: 'ShieldCheck', title: 'Privacy First', description: 'QR codes are generated in your browser. We do not store or track your content.' },
  { icon: 'Gift', title: 'Free Forever', description: 'Every feature is available to everyone at no cost — now and in the future.' },
  { icon: 'Zap', title: 'Fast & Reliable', description: 'Instant generation with scanning-tested output you can trust.' },
  { icon: 'Heart', title: 'Built with Care', description: 'Every pixel and interaction is crafted for a delightful experience.' },
];

export function AboutPage() {
  useSeo({
    title: 'About FreeQRHub',
    description: 'Learn about FreeQRHub — our mission to make QR code creation fast, private and free for everyone.',
    canonical: '/about',
  });

  return (
    <div className="bg-white">
      <section className="bg-gradient-hero section-padding">
        <div className="container-narrow text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
              Our Story
            </span>
            <h1 className="mt-4 text-display-md font-bold tracking-tight text-secondary-900 text-balance">
              Making QR Codes Accessible to Everyone
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-secondary-500 text-balance">
              FreeQRHub was born from a simple idea: creating QR codes should be fast, beautiful and completely free. No paywalls, no watermarks, no data harvesting — just a clean tool that works.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-base">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: 'Target', title: 'Mission', text: 'Provide the fastest, simplest and most private QR code generator on the internet.' },
              { icon: 'Eye', title: 'Vision', text: 'A world where anyone can create beautiful QR codes without barriers or cost.' },
              { icon: 'Heart', title: 'Values', text: 'Privacy, accessibility and quality in everything we build.' },
            ].map((item, i) => {
              const Icon = getLucideIcon(item.icon);
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card hover className="h-full p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-secondary-900">{item.title}</h3>
                    <p className="mt-2 text-sm text-secondary-500">{item.text}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-base">
          <SectionHeading title="What We Stand For" description="The principles that guide every decision we make." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {VALUES.map((value, i) => {
              const Icon = getLucideIcon(value.icon);
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex items-start gap-4 rounded-2xl border border-secondary-200 bg-white p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-secondary-900">{value.title}</h3>
                    <p className="mt-1 text-sm text-secondary-500">{value.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
