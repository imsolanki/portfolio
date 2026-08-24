"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { EXPERIENCES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { CheckCircle2, MapPin, Calendar } from "lucide-react";

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <section id="experience" className="w-full py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading label="Experience" title="Enterprise Engineering Journey" />

        <div ref={containerRef} className="mt-16 relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-surface-border">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-purple-500 to-cyan-500 origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-12">
            {EXPERIENCES.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              
              return (
                <div key={exp.id} className="relative flex flex-col md:flex-row items-start md:justify-between group">
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 mt-6 md:mt-8 w-3 h-3 rounded-full bg-bg-primary border border-text-muted/30 z-10 -translate-x-[5px] md:-translate-x-1.5">
                    <motion.div 
                      className="absolute inset-0 rounded-full bg-cyan-400"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: false, margin: "-100px" }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div 
                      className="absolute inset-0 rounded-full bg-cyan-400 blur-sm"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 2, opacity: 0.5 }}
                      viewport={{ once: false, margin: "-100px" }}
                      transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                    />
                  </div>

                  {/* Card Container */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className={cn(
                      "w-full md:w-[calc(50%-2.5rem)] ml-12 md:ml-0",
                      isEven ? "md:pr-10" : "md:ml-auto md:pl-10"
                    )}
                  >
                    <GlassCard className="p-6 md:p-8">
                      <div className="flex flex-col space-y-4">
                        <div className="flex flex-wrap justify-between items-start gap-4">
                          <div>
                            <h3 className="text-2xl font-bold text-text-primary flex items-center gap-3">
                              {exp.company}
                              {exp.highlight && (
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                                  {exp.highlight}
                                </span>
                              )}
                            </h3>
                            <div className="text-lg text-purple-400 font-medium mt-1">
                              {exp.role}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-text-muted">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {exp.period}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            {exp.location}
                          </div>
                        </div>

                        <p className="text-text-secondary leading-relaxed text-sm md:text-base">
                          {exp.description}
                        </p>

                        <ul className="space-y-3 mt-4">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm md:text-base text-text-secondary">
                              <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="pt-6 mt-4 border-t border-surface-border flex flex-wrap gap-2">
                          {exp.technologies.map((tech, i) => (
                            <span 
                              key={i}
                              className="px-3 py-1 rounded-md text-xs font-medium bg-surface text-text-secondary border border-surface-border"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
