'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { GlassCard } from '@/components/ui/glass-card';
import { BLOG_POSTS } from '@/lib/constants';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function BlogPreview() {
  return (
    <section id="blog" className="py-24 relative">
      <div className="container mx-auto px-4">
        <SectionHeading label="Technical Blog" title="Insights & Engineering Deep Dives" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <GlassCard className="h-full flex flex-col overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:border-purple-500/50">
                <div className={cn("h-1 w-full bg-gradient-to-r", "from-purple-500 to-cyan-500")} />
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-4 text-xs text-text-muted">
                    <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10 uppercase tracking-wider font-medium">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readingTime}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-text-muted line-clamp-2 mb-6 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-md bg-white/5 text-text-muted">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <Link href={`/blog/${post.slug}`} className="mt-auto inline-flex items-center text-sm font-medium text-white hover:text-purple-400 transition-colors group/link">
                    Read More 
                    <ArrowRight className="w-4 h-4 ml-1 transform transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
