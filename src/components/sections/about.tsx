"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { EDUCATION } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SKILLS = [
  {
    category: "Backend",
    skills: ["Java", "Spring Boot", "Microservices", "REST APIs"],
  },
  {
    category: "AI",
    skills: ["GenAI", "Agentic AI", "LLM Integration", "Prompt Engineering"],
  },
  {
    category: "Cloud",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
  },
  {
    category: "Data",
    skills: ["PostgreSQL", "MySQL", "Kafka", "Redis"],
  },
];

const STATS = [
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 30, suffix: "+", label: "Projects Delivered" },
  { value: 2, suffix: "M+", label: "Users Impacted" },
  { value: 200, suffix: "+", label: "DSA Problems" },
];

export function About() {
  return (
    <section id="about" className="w-full py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading label="About Me" title="Engineering Excellence at Scale" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-6 text-text-secondary text-lg leading-relaxed"
          >
            <p>
              With over 5 years of engineering enterprise software across fintech, telecom, and cloud platforms, I specialize in building systems that don't just work — they scale. My journey spans from architecting Goldman Sachs' client onboarding platform at KPMG to building cloud-native microservices serving 2 million subscribers at Telaverge Communications.
            </p>
            <p>
              Today, I operate at the intersection of backend engineering and AI — integrating agentic AI workflows into enterprise development pipelines, building RAG systems, and designing multi-agent architectures. I believe the future of software engineering is AI-augmented, and I'm building it.
            </p>
            <p>
              I'm based in Bengaluru, India with international experience from Canada. When I'm not building production systems, you'll find me solving DSA problems on LeetCode (200+ and counting) or designing the next distributed system architecture.
            </p>
            
            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 mt-6 border-t border-surface-border">
              {STATS.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 flex items-center">
                    <AnimatedCounter value={stat.value} label={stat.label} />
                    <span>{stat.suffix}</span>
                  </div>
                  <div className="text-sm text-text-muted mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skills & Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col space-y-8"
          >
            {/* Skills */}
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold text-text-primary mb-6 font-heading">Core Competencies</h3>
              <div className="space-y-6">
                {SKILLS.map((group, idx) => (
                  <div key={idx}>
                    <div className="text-sm font-medium text-purple-400 mb-3">{group.category}</div>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-3 py-1 rounded-full text-sm bg-surface border border-surface-border text-text-secondary hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-colors cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Education */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-text-primary mb-4 font-heading">Education</h3>
              {EDUCATION.map((edu, idx) => (
                <GlassCard key={idx} className="p-5" hoverEffect={false}>
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <div className="font-semibold text-text-primary">{edu.degree}</div>
                      <div className="text-text-muted text-sm mt-1">{edu.institution}</div>
                      <div className="text-text-muted text-xs mt-1">{edu.location}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-cyan-400 text-sm font-medium">{edu.score}</div>
                      <div className="text-text-muted text-xs mt-1">{edu.period}</div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
