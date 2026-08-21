'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, Calendar, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/icons/social-icons';
import { cn } from '@/lib/utils';

const TITLES = [
  'Backend Architect',
  'AI Engineer',
  'System Designer',
  'Cloud Specialist',
];

export function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const headlineLines = [
    { text: 'I Build Enterprise Software', className: '' },
    { text: '& AI Systems', className: 'bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500' },
    { text: 'That Scale.', className: '' }
  ];

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20">
      <div className="container px-6 mx-auto flex flex-col items-center text-center z-10 relative">
        
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-bg-secondary/30 backdrop-blur-sm"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span className="text-sm font-medium text-text-muted">Available for Freelance Projects</span>
        </motion.div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight mb-6 max-w-5xl leading-tight md:leading-tight">
          {headlineLines.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.33, 1, 0.68, 1] }}
                className={cn('block', line.className)}
              >
                {line.text}
              </motion.div>
            </div>
          ))}
        </h1>

        {/* Rotating Title */}
        <div className="h-10 text-xl md:text-2xl font-medium text-text-primary mb-4 overflow-hidden flex items-center justify-center">
          <span className="text-text-muted mr-2">I am a</span>
          <div className="relative h-full flex items-center overflow-hidden min-w-[200px]">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={titleIndex}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="absolute left-0 text-purple-400 font-semibold"
              >
                {TITLES[titleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-lg md:text-xl text-text-muted max-w-2xl mb-10"
        >
          Senior Software Engineer crafting production-grade backend systems, distributed architectures, and AI-powered applications. From Goldman Sachs platforms to cloud-native microservices serving millions.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-12"
        >
          <a
            href="#contact"
            className="group flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-500 hover:to-blue-500 transition-all shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]"
          >
            Hire Me
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#projects"
            className="group flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full bg-bg-secondary/50 hover:bg-bg-secondary border border-border text-text-primary font-medium transition-colors"
          >
            View Projects
            <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </a>
          <a
            href="https://cal.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full border border-border text-text-primary font-medium hover:bg-white/5 transition-colors"
          >
            <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Book a Call
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex items-center gap-6"
        >
          <a href="https://github.com/imsolanki" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-text-primary transition-colors p-2 hover:bg-bg-secondary rounded-full">
            <GithubIcon className="w-5 h-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a href="https://linkedin.com/in/lalit-kumar-singh-aa447451/" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-blue-500 transition-colors p-2 hover:bg-bg-secondary rounded-full">
            <LinkedinIcon className="w-5 h-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href="mailto:shobhitsingh.e28@gmail.com" className="text-text-muted hover:text-text-primary transition-colors p-2 hover:bg-bg-secondary rounded-full">
            <Mail className="w-5 h-5" />
            <span className="sr-only">Email</span>
          </a>
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-text-muted uppercase tracking-widest">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
