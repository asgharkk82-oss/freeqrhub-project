import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send } from 'lucide-react';
import { useSeo } from '../hooks/useSeo';
import { Button } from '../components/ui/button';
import { Field, Input, Textarea } from '../components/ui/input';
import { Toast } from '../components/ui/toast';
import { useToast } from '../hooks/useToast';

export function ContactPage() {
  useSeo({
    title: 'Contact Us',
    description: 'Get in touch with the FreeQRHub team. We would love to hear from you.',
    canonical: '/contact',
  });

  const { toast, showToast, dismissToast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email';
    if (!form.message.trim()) next.message = 'Message is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    showToast('Message sent! We will get back to you soon.', 'success');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-white">
      <section className="bg-gradient-hero section-padding lg:py-20">
        <div className="container-narrow text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
              Contact
            </span>
            <h1 className="mt-4 text-display-md font-bold tracking-tight text-secondary-900 text-balance">
              Get in Touch
            </h1>
            <p className="mt-4 text-lg text-secondary-500 text-balance">
              Have a question, suggestion or just want to say hello? We would love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-base">
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-[1fr_1.5fr]">
            {/* Info */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-secondary-200 bg-surface p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                  <Mail className="h-5 w-5" />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-secondary-900">Email</h3>
                <p className="mt-1 text-sm text-secondary-500">hello@freeqrhub.com</p>
              </div>
              <div className="rounded-2xl border border-secondary-200 bg-surface p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-50 text-accent-600">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-secondary-900">Feedback</h3>
                <p className="mt-1 text-sm text-secondary-500">We welcome your ideas and suggestions.</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-secondary-200 bg-white p-6 shadow-card">
              <Field label="Your Name" htmlFor="name" error={errors.name} required>
                <Input id="name" value={form.name} error={!!errors.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="John Doe" />
              </Field>
              <Field label="Email Address" htmlFor="contact-email" error={errors.email} required>
                <Input id="contact-email" type="email" value={form.email} error={!!errors.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="john@example.com" />
              </Field>
              <Field label="Message" htmlFor="message" error={errors.message} required>
                <Textarea id="message" value={form.message} error={!!errors.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="How can we help?" className="min-h-[140px]" />
              </Field>
              <Button type="submit" size="lg" fullWidth>
                <Send className="h-4 w-4" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Toast toast={toast} onDismiss={dismissToast} />
    </div>
  );
}
