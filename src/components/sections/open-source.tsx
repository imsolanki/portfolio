'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { Star, GitFork, GitMerge } from 'lucide-react';
import { GithubIcon } from '@/components/icons/social-icons';
import Link from 'next/link';

export function OpenSource() {
  // Generate random data for the contribution grid
  const cols = 52;
  const rows = 7;
  const levels = [
    'bg-white/5', // empty
    'bg-green-900/40', // light
    'bg-green-600/60', // medium
    'bg-green-400/80' // dark
  ];

  // Deterministic seeded random for SSR/client consistency
  function seededRandom(seed: number) {
    let t = seed + 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  const grid = Array.from({ length: cols }).map((_, x) =>
    Array.from({ length: rows }).map((_, y) => {
      const rand = seededRandom(x * 7 + y + 42);
      if (rand < 0.5) return 0;
      if (rand < 0.8) return 1;
      if (rand < 0.95) return 2;
      return 3;
    })
  );

  return (
    <section id="open-source" className="py-24 relative bg-black/20">
      <div className="container mx-auto px-4">
        <SectionHeading label="Open Source" title="Contributing to the Community" />
        
        <div className="max-w-5xl mx-auto">
          {/* GitHub Style Grid */}
          <div className="bg-[#0d1117] border border-white/10 rounded-xl p-6 mb-8 overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="flex gap-1 mb-2 text-xs text-text-muted">
                <div className="w-8" /> {/* Spacer for days */}
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => (
                  <div key={month} className="flex-1">{month}</div>
                ))}
              </div>
              
              <div className="flex gap-1">
                <div className="flex flex-col gap-1 text-xs text-text-muted mr-2 justify-between py-1">
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                </div>
                
                {grid.map((col, x) => (
                  <div key={x} className="flex flex-col gap-1">
                    {col.map((level, y) => (
                      <motion.div
                        key={`${x}-${y}`}
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.2,
                          delay: (x * 0.01) + (y * 0.01),
                        }}
                        className={`w-3 h-3 rounded-sm ${levels[level]}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { label: 'Total Repos', value: '45+', icon: <GithubIcon className="w-5 h-5" /> },
              { label: 'Stars Earned', value: '1.2k', icon: <Star className="w-5 h-5 text-yellow-500" /> },
              { label: 'Contributions (Year)', value: '850+', icon: <GitMerge className="w-5 h-5 text-green-500" /> },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-center gap-4"
              >
                <div className="p-3 bg-white/10 rounded-lg">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-text-muted">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              href="https://github.com/imsolanki"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-neutral-200 transition-colors"
            >
              <GithubIcon className="w-5 h-5" />
              View My GitHub Profile
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
