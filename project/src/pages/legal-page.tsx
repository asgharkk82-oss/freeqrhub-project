import { motion } from 'framer-motion';
import { useSeo } from '../hooks/useSeo';

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  sections: { heading: string; body: string[] }[];
  canonical: string;
}

export function LegalPage({ title, lastUpdated, sections, canonical }: LegalPageProps) {
  useSeo({ title, description: `${title} for FreeQRHub.`, canonical });

  return (
    <div className="bg-white">
      <section className="bg-gradient-hero pt-20 pb-12">
        <div className="container-narrow">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-display-sm font-bold tracking-tight text-secondary-900 sm:text-display-md"
          >
            {title}
          </motion.h1>
          <p className="mt-3 text-sm text-secondary-400">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-narrow space-y-8">
          {sections.map((section, i) => (
            <motion.div
              key={section.heading}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <h2 className="text-xl font-semibold text-secondary-900">{section.heading}</h2>
              {section.body.map((para, j) => (
                <p key={j} className="mt-3 text-sm leading-relaxed text-secondary-600">{para}</p>
              ))}
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
