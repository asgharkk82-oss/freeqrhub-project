import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { BLOG_POSTS } from '../constants';
import { useSeo } from '../hooks/useSeo';

export function BlogPostPage() {
  const { slug } = useParams();

  const post = BLOG_POSTS.find((item) => item.slug === slug);

  if (!post) {
    return (
      <div className="container-base py-20 text-center">
        <h1 className="text-3xl font-bold text-secondary-900">
          Blog Post Not Found
        </h1>

        <p className="mt-4 text-secondary-500">
          Sorry, the article you are looking for does not exist.
        </p>

        <Link
          to="/blog"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 font-medium text-white hover:bg-primary-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>
      </div>
    );
  }

  useSeo({
    title: post.title,
    description: post.description,
    canonical: `/blog/${post.slug}`,
  });

  return (
    <div className="bg-white">
      <section className="section-padding">
        <div className="container-narrow">

          <Link
            to="/blog"
            className="mb-8 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-600">
            {post.category}
          </span>

          <h1 className="mt-4 text-display-md font-bold text-secondary-900 text-balance">
            {post.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-secondary-500">
            <span>{post.author}</span>
            <span>•</span>
            <span>
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          <img
            src={post.image}
            alt={post.title}
            className="mt-10 w-full rounded-2xl shadow-lg"
          />

          <article className="prose prose-lg mt-10 max-w-none">
            {post.content.split('\n').map((line, index) => {
              if (!line.trim()) return null;

              if (line.startsWith('##')) {
                return (
                  <h2
                    key={index}
                    className="mt-8 text-2xl font-bold text-secondary-900"
                  >
                    {line.replace('##', '').trim()}
                  </h2>
                );
              }

              return (
                <p
                  key={index}
                  className="mt-4 leading-8 text-secondary-700"
                >
                  {line}
                </p>
              );
            })}
          </article>

        </div>
      </section>
    </div>
  );
}