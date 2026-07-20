import { motion } from 'framer-motion';
import type { Feature } from '../../types';
import { WHY_CHOOSE } from '../../constants';
import { SectionHeading } from '../../components/ui/section-heading';
import { getLucideIcon } from '../../utils/icons';

export function WhyChooseSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-base">
        <SectionHeading
          eyebrow="Why FreeQRHub"
          title="Why Choose FreeQRHub?"
          description="We believe QR code creation should be effortless, private and completely free."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE.map((item: Feature, index) => {
            const Icon = getLucideIcon(item.icon);
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="flex items-start gap-4 rounded-2xl border border-secondary-200 bg-white p-5 transition-all hover:border-primary-200 hover:shadow-card"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-600">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-secondary-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-secondary-500">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
