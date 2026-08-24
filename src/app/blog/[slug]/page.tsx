import { BLOG_POSTS } from "@/lib/constants";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import type { Metadata } from "next";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — Lalit Kumar Singh`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-32 pb-24">
      <article className="container mx-auto px-4 max-w-3xl">
        {/* Back Link */}
        <Link
          href="/#blog"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent-purple transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to all posts
        </Link>

        {/* Category Badge */}
        <div className="mb-6">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-surface border border-surface-border text-accent-purple uppercase tracking-wider">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-text-primary leading-tight mb-6">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-8 pb-8 border-b border-border">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {post.readingTime} read
          </span>
        </div>

        {/* Excerpt / Summary */}
        <div className="space-y-6">
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
            {post.excerpt}
          </p>

          {/* Coming Soon Card */}
          <div className="mt-12 p-8 rounded-2xl bg-surface border border-surface-border text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-purple/10 text-accent-purple mb-4">
              <svg
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                />
              </svg>
            </div>
            <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
              Full article coming soon
            </h3>
            <p className="text-text-muted mb-6 max-w-md mx-auto">
              This article is currently being written. Subscribe to get notified
              when it&apos;s published.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-500 hover:to-blue-500 transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]"
            >
              Get Notified
            </Link>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-4 h-4 text-text-muted" />
            <span className="text-sm font-medium text-text-muted">Tags</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full text-sm bg-surface border border-surface-border text-text-secondary"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Other Posts */}
        <div className="mt-16 pt-8 border-t border-border">
          <h3 className="text-xl font-heading font-semibold text-text-primary mb-6">
            Other Articles
          </h3>
          <div className="grid gap-4">
            {BLOG_POSTS.filter((p) => p.slug !== post.slug).map(
              (otherPost) => (
                <Link
                  key={otherPost.slug}
                  href={`/blog/${otherPost.slug}`}
                  className="group p-4 rounded-xl bg-surface border border-surface-border hover:border-accent-purple/30 transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-medium text-text-primary group-hover:text-accent-purple transition-colors">
                        {otherPost.title}
                      </h4>
                      <p className="text-sm text-text-muted mt-1">
                        {otherPost.readingTime} · {otherPost.category}
                      </p>
                    </div>
                    <ArrowLeft className="w-4 h-4 text-text-muted rotate-180 group-hover:translate-x-1 transition-transform shrink-0" />
                  </div>
                </Link>
              )
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
