import { motion } from 'framer-motion';
import { useSeo } from '../hooks/useSeo';
import { HeroSection } from '../features/home/hero-section';
import { GeneratorPreviewSection } from '../features/home/generator-preview-section';
import { FeaturesSection } from '../features/home/features-section';
import { WhyChooseSection } from '../features/home/why-choose-section';
import { HowItWorksSection } from '../features/home/how-it-works-section';
import { CtaSection } from '../features/home/cta-section';
import { FaqSection } from '../features/home/faq-section';
import { BlogPreviewSection } from '../features/home/blog-preview-section';

export function HomePage() {
  useSeo({
    canonical: '/',
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <HeroSection />
      <GeneratorPreviewSection />
      <FeaturesSection />
      <WhyChooseSection />
      <HowItWorksSection />
      <CtaSection />
      <FaqSection />
      <BlogPreviewSection />
    </motion.div>
  );
}
