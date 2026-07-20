import { motion } from 'framer-motion';
import type { Feature } from '../../types';
import { FEATURES } from '../../constants';
import { SectionHeading } from '../../components/ui/section-heading';
import { Card } from '../../components/ui/card';
import { getLucideIcon } from '../../utils/icons';

export function FeaturesSection() {
  return (
    <section id="features" className="section-padding bg-surface">
      <div className="container-base">
        <SectionHeading
          eyebrow="Features"
          title="Everything You Need To Create Perfect QR Codes"
          description="Powerful customization wrapped in a simple, beautiful interface."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature: Feature, index) => {
            const Icon = getLucideIcon(feature.icon);
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
              >
                <Card hover className="group h-full p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-all duration-300 group-hover:bg-primary-600 group-hover:text-white">
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-secondary-900">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-secondary-500">{feature.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
