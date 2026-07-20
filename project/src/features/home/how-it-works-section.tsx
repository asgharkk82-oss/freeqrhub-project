import { motion } from 'framer-motion';
import { HOW_IT_WORKS } from '../../constants';
import { SectionHeading } from '../../components/ui/section-heading';
import { getLucideIcon } from '../../utils/icons';

export function HowItWorksSection() {
  return (
    <section className="section-padding bg-surface">
      <div className="container-base">
        <SectionHeading
          eyebrow="How It Works"
          title="Create Your QR Code in 4 Simple Steps"
          description="From start to download in under a minute."
        />

        <div className="relative mt-14">
          {/* Connecting line */}
          <div
            className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-secondary-200 to-transparent lg:block"
            aria-hidden="true"
          />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((step, index) => {
              const Icon = getLucideIcon(step.icon);
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative text-center"
                >
                  <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-secondary-200 bg-white shadow-card">
                    <Icon className="h-7 w-7 text-primary-600" strokeWidth={2} />
                    <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white shadow-sm">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-secondary-900">{step.title}</h3>
                  <p className="mt-1.5 text-sm text-secondary-500">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
