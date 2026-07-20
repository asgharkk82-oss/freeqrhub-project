import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/header';
import { Footer } from './components/layout/footer';
import { ErrorBoundary } from './components/common/error-boundary';
import ScrollToHash from './components/ScrollToHash';
import { ScrollToTop } from './components/common/scroll-to-top';
import { HomePage } from './pages/home-page';

const GeneratorPage = lazy(() => import('./pages/generator-page').then((m) => ({ default: m.GeneratorPage })));
const AboutPage = lazy(() => import('./pages/about-page').then((m) => ({ default: m.AboutPage })));
const BlogPage = lazy(() => import('./pages/blog-page').then((m) => ({ default: m.BlogPage })));
const ContactPage = lazy(() => import('./pages/contact-page').then((m) => ({ default: m.ContactPage })));
const PrivacyPage = lazy(() => import('./pages/privacy-page').then((m) => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('./pages/terms-page').then((m) => ({ default: m.TermsPage })));
const NotFoundPage = lazy(() => import('./pages/not-found-page').then((m) => ({ default: m.NotFoundPage })));

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-3 border-secondary-200 border-t-primary-600" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ScrollToHash />
      <ErrorBoundary>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/generator" element={<GeneratorPage />} />
                <Route path="/wifi-qr-code-generator" element={<GeneratorPage />} />
<Route path="/email-qr-code-generator" element={<GeneratorPage />} />
<Route path="/url-qr-code-generator" element={<GeneratorPage />} />
<Route path="/vcard-qr-code-generator" element={<GeneratorPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
