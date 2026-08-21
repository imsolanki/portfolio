'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Menu, X, Sun, Moon, Command } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from '@/lib/constants';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observers = new Map();
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    NAV_ITEMS.forEach((item) => {
      const element = document.getElementById(item.href.replace('#', ''));
      if (element) {
        observer.observe(element);
        observers.set(item.href, element);
      }
    });

    return () => {
      observers.forEach((element) => observer.unobserve(element));
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-bg-primary/70 backdrop-blur-md border-b border-white/10 shadow-sm py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#hero" className="relative group">
              <span className="text-2xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
                LKS
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'relative text-sm font-medium transition-colors hover:text-text-primary',
                    activeSection === item.href.replace('#', '')
                      ? 'text-text-primary'
                      : 'text-text-muted'
                  )}
                >
                  {item.label}
                  {activeSection === item.href.replace('#', '') && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500"
                    />
                  )}
                </a>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="hidden lg:flex items-center space-x-1 px-2 py-1 rounded-md bg-bg-secondary/50 border border-border text-xs text-text-muted">
                <Command className="w-3 h-3" />
                <span>K</span>
              </div>
              
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full bg-bg-secondary/50 hover:bg-bg-secondary text-text-primary transition-colors"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              
              <a
                href="#contact"
                className="px-4 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]"
              >
                Hire Me
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-text-primary"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-bg-primary/95 backdrop-blur-xl flex flex-col p-6"
          >
            <div className="flex justify-end">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full bg-bg-secondary/50 text-text-primary"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col justify-center items-center space-y-8 text-2xl font-heading">
              {NAV_ITEMS.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'transition-colors hover:text-purple-400',
                    activeSection === item.href.replace('#', '')
                      ? 'text-purple-500'
                      : 'text-text-primary'
                  )}
                >
                  {item.label}
                </motion.a>
              ))}
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="pt-8 flex items-center space-x-6"
              >
                <button
                  onClick={() => {
                    setTheme(theme === 'dark' ? 'light' : 'dark');
                    setMobileMenuOpen(false);
                  }}
                  className="p-3 rounded-full bg-bg-secondary text-text-primary"
                >
                  {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                </button>
                
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-6 py-3 text-lg font-medium rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                >
                  Hire Me
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
