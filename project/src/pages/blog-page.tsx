import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { BlogPost } from '../types';
import { BLOG_POSTS } from '../constants';
import { useSeo } from '../hooks/useSeo';


export function BlogPage() {
  useSeo({
    title: 'Blog',
    description: 'Guides, tips and best practices for creating and using QR codes effectively.',
    canonical: '/blog',
  });

  return (
    <div className="bg-white">
      <section className="bg-gradient-hero section-padding lg:py-20">
        <div className="container-narrow text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
              Blog
            </span>
            <h1 className="mt-4 text-display-md font-bold tracking-tight text-secondary-900 text-balance">
              QR Code Guides & Tips
            </h1>
            <p className="mt-4 text-lg text-secondary-500 text-balance">
              Learn how to create, customize and use QR codes effectively.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-base">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post: BlogPost, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-secondary-200 bg-white shadow-card transition-all hover:shadow-card-hover hover:-translate-y-1"
              >
                <Link to={`/blog/${post.slug}`} className="block overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-2 text-xs text-secondary-400">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </time>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="mt-2 text-lg font-semibold text-secondary-900 group-hover:text-primary-700">
                    {post.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-secondary-500">{post.description}</p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
                  >
                    Read More
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
