'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { GlassCard } from '@/components/ui/glass-card';
import { TESTIMONIALS } from '@/lib/constants';
import { Quote } from 'lucide-react';

export function Testimonials() {
  // Duplicate for infinite scroll
  const items = [...TESTIMONIALS, ...TESTIMONIALS];
  const itemsRow2 = [...TESTIMONIALS, ...TESTIMONIALS].reverse();

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 mb-16">
        <SectionHeading label="Testimonials" title="What People Say" />
      </div>

      <div className="relative flex flex-col gap-8 group">
        {/* Row 1 - Left to Right */}
        <div className="flex w-fit animate-marquee hover:[animation-play-state:paused]">
          {items.map((testimonial, i) => (
            <div key={`row1-${i}`} className="w-[350px] md:w-[450px] shrink-0 px-4">
              <GlassCard className="h-full p-8 flex flex-col justify-between">
                <div>
                  <Quote className="w-10 h-10 text-purple-500/20 mb-6" />
                  <p className="italic text-text-muted mb-6 line-clamp-4">
                    "{testimonial.quote}"
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center font-bold text-white">
                    {testimonial.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                  </div>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-text-muted">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>

        {/* Row 2 - Right to Left */}
        <div className="flex w-fit animate-marquee-reverse hover:[animation-play-state:paused]">
          {itemsRow2.map((testimonial, i) => (
            <div key={`row2-${i}`} className="w-[350px] md:w-[450px] shrink-0 px-4">
              <GlassCard className="h-full p-8 flex flex-col justify-between">
                <div>
                  <Quote className="w-10 h-10 text-purple-500/20 mb-6" />
                  <p className="italic text-text-muted mb-6 line-clamp-4">
                    "{testimonial.quote}"
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center font-bold text-white">
                    {testimonial.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                  </div>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-text-muted">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
