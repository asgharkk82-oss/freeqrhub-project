import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { BlogPost } from '../../types';
import { BLOG_POSTS } from '../../constants';
import { SectionHeading } from '../../components/ui/section-heading';
import { Button } from '../../components/ui/button';

export function BlogPreviewSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-base">
        <SectionHeading
          eyebrow="Blog"
          title="Latest from the Blog"
          description="Guides, tips and best practices for getting the most out of QR codes."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
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
                <h3 className="mt-2 text-base font-semibold text-secondary-900 group-hover:text-primary-700">
                  {post.title}
                </h3>
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

        <div className="mt-10 text-center">
          <Link to="/blog">
            <Button variant="outline" size="lg">
              View All Posts
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
