import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FAQS } from '../../constants';
import { SectionHeading } from '../../components/ui/section-heading';
import { Accordion } from '../../components/ui/accordion';
import { Button } from '../../components/ui/button';

export function FaqSection() {
  return (
    <section className="section-padding bg-surface">
      <div className="container-base">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          description="Everything you need to know about FreeQRHub and QR codes."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-10 max-w-3xl"
        >
          <Accordion items={FAQS} />
        </motion.div>

        <div className="mt-8 text-center">
          <p className="text-sm text-secondary-500">Still have questions?</p>
          <Link to="/contact" className="mt-2 inline-block">
            <Button variant="outline" size="md">Contact Us</Button>
          </Link>
        </div>

        {/* FAQ structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: FAQS.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: { '@type': 'Answer', text: faq.answer },
              })),
            }),
          }}
        />
      </div>
    </section>
  );
}
