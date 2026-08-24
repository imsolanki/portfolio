'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { Mail, MapPin, Phone } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/icons/social-icons';
import Link from 'next/link';

export function Contact() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement)?.value;
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value;
    const subject = (form.elements.namedItem('subject') as HTMLSelectElement)?.value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement)?.value;
    const mailtoUrl = `mailto:shobhitsingh.e28@gmail.com?subject=${encodeURIComponent(subject + ' from ' + name)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-4">
        <SectionHeading label="Get In Touch" title="Let's Build Something Great" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 max-w-6xl mx-auto">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg text-text-muted mb-8">
              Ready to discuss your next project? I&apos;m currently available for freelance work and consulting engagements.
            </p>
            
            <div className="space-y-6 mb-8">
              <a href="mailto:shobhitsingh.e28@gmail.com" className="flex items-center gap-4 text-text-primary hover:text-purple-400 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-surface border border-surface-border flex items-center justify-center group-hover:border-purple-500/50 group-hover:bg-purple-500/10 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-base sm:text-lg font-medium break-all">shobhitsingh.e28@gmail.com</span>
              </a>
              
              <a href="tel:+916306672872" className="flex items-center gap-4 text-text-primary hover:text-purple-400 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-surface border border-surface-border flex items-center justify-center group-hover:border-purple-500/50 group-hover:bg-purple-500/10 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-base sm:text-lg font-medium">+91-6306672872</span>
              </a>
              
              <div className="flex items-center gap-4 text-text-primary group">
                <div className="w-12 h-12 rounded-full bg-surface border border-surface-border flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-lg font-medium">Bengaluru, India</span>
              </div>
            </div>
            
            <div className="flex gap-4 mb-8">
              <Link href="https://linkedin.com/in/lalit-kumar-singh-aa447451/" target="_blank" className="w-12 h-12 rounded-full bg-surface border border-surface-border flex items-center justify-center hover:bg-surface-active transition-colors">
                <LinkedinIcon className="w-5 h-5" />
              </Link>
              <Link href="https://github.com/imsolanki" target="_blank" className="w-12 h-12 rounded-full bg-surface border border-surface-border flex items-center justify-center hover:bg-surface-active transition-colors">
                <GithubIcon className="w-5 h-5" />
              </Link>
            </div>
            
            <a
              href="https://calendly.com/lalitkumarsingh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-full hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-shadow"
            >
              Book a Consultation
            </a>
          </motion.div>
          
          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-surface border border-surface-border p-6 sm:p-8 rounded-2xl backdrop-blur-md"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-text-secondary">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-bg-primary/50 border border-surface-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-shadow"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-text-secondary">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-bg-primary/50 border border-surface-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-shadow"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-text-secondary">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full bg-bg-primary/50 border border-surface-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-shadow appearance-none"
                  >
                    <option>Freelance Project</option>
                    <option>Consulting</option>
                    <option>Full-time Role</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="budget" className="text-sm font-medium text-text-secondary">Budget Range</label>
                  <select
                    id="budget"
                    name="budget"
                    className="w-full bg-bg-primary/50 border border-surface-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-shadow appearance-none"
                  >
                    <option>$1K - $5K</option>
                    <option>$5K - $10K</option>
                    <option>$10K - $25K</option>
                    <option>$25K+</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-text-secondary">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full bg-bg-primary/50 border border-surface-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-shadow resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg hover:from-purple-500 hover:to-blue-500 transition-colors"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
