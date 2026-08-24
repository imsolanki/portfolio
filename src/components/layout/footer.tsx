'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/icons/social-icons';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-bg-primary border-t border-surface-border relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-8">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="text-2xl font-bold font-heading bg-gradient-to-r from-text-primary to-text-muted bg-clip-text text-transparent mb-2">
              LKS.
            </Link>
            <p className="text-sm text-text-muted">
              Building intelligent, scalable solutions for the modern web.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <Link href="#about" className="text-text-muted hover:text-text-primary transition-colors">About</Link>
            <Link href="#experience" className="text-text-muted hover:text-text-primary transition-colors">Experience</Link>
            <Link href="#projects" className="text-text-muted hover:text-text-primary transition-colors">Projects</Link>
            <Link href="#blog" className="text-text-muted hover:text-text-primary transition-colors">Blog</Link>
            <Link href="#contact" className="text-text-muted hover:text-text-primary transition-colors">Contact</Link>
          </div>
          
          {/* Social Icons */}
          <div className="flex justify-center md:justify-end gap-4">
            <Link href="https://github.com/imsolanki" target="_blank" className="p-2 rounded-full bg-surface hover:bg-surface-active text-text-muted hover:text-text-primary transition-colors">
              <GithubIcon className="w-5 h-5" />
            </Link>
            <Link href="https://linkedin.com/in/lalit-kumar-singh-aa447451/" target="_blank" className="p-2 rounded-full bg-surface hover:bg-surface-active text-text-muted hover:text-text-primary transition-colors">
              <LinkedinIcon className="w-5 h-5" />
            </Link>
            <a href="mailto:shobhitsingh.e28@gmail.com" className="p-2 rounded-full bg-surface hover:bg-surface-active text-text-muted hover:text-text-primary transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="text-center text-sm text-text-muted border-t border-surface-border pt-8">
          &copy; {currentYear} Lalit Kumar Singh. All rights reserved.
        </div>
      </motion.div>
    </footer>
  );
}
