'use client';

import { motion } from 'framer-motion';
import { STATS } from '@/lib/constants';
import { AnimatedCounter } from '@/components/ui/animated-counter';

export function Statistics() {
  return (
    <section id="statistics" className="w-full relative py-20 overflow-hidden">
      {/* Subtle radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-6 flex flex-col items-center justify-center text-center border border-surface-border rounded-2xl bg-surface backdrop-blur-sm"
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
              </div>
              <div className="text-text-muted text-sm uppercase tracking-wider font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
