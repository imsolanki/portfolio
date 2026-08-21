'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { Mail, MapPin, Phone } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/icons/social-icons';
import Link from 'next/link';

export function Contact() {
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
              Ready to discuss your next project? I'm currently available for freelance work and consulting engagements.
            </p>
            
            <div className="space-y-6 mb-8">
              <a href="mailto:shobhitsingh.e28@gmail.com" className="flex items-center gap-4 text-white hover:text-purple-400 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-purple-500/50 group-hover:bg-purple-500/10 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-lg font-medium">shobhitsingh.e28@gmail.com</span>
              </a>
              
              <a href="tel:+916306672872" className="flex items-center gap-4 text-white hover:text-purple-400 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-purple-500/50 group-hover:bg-purple-500/10 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-lg font-medium">+91-6306672872</span>
              </a>
              
              <div className="flex items-center gap-4 text-white group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-lg font-medium">Bengaluru, India</span>
              </div>
            </div>
            
            <div className="flex gap-4 mb-8">
              <Link href="https://linkedin.com/in/lalit-kumar-singh-aa447451/" target="_blank" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                <LinkedinIcon className="w-5 h-5" />
              </Link>
              <Link href="https://github.com/imsolanki" target="_blank" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                <GithubIcon className="w-5 h-5" />
              </Link>
            </div>
            
            <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-full hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-shadow">
              Book a Consultation
            </button>
          </motion.div>
          
          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-white/80">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-shadow"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-white/80">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-shadow"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-white/80">Subject</label>
                  <select
                    id="subject"
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-shadow appearance-none"
                  >
                    <option>Freelance Project</option>
                    <option>Consulting</option>
                    <option>Full-time Role</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="budget" className="text-sm font-medium text-white/80">Budget Range</label>
                  <select
                    id="budget"
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-shadow appearance-none"
                  >
                    <option>$1K - $5K</option>
                    <option>$5K - $10K</option>
                    <option>$10K - $25K</option>
                    <option>$25K+</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-white/80">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-shadow resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full py-4 bg-white text-black font-bold rounded-lg hover:bg-neutral-200 transition-colors"
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
