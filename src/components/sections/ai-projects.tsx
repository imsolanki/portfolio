"use client";

import { motion } from "framer-motion";
import { Database, Users, Bot, MessageSquare, Sparkles, Network, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { AI_PROJECTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const categoryColors: Record<string, { bg: string, text: string, border: string, glow: string }> = {
  llm: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20", glow: "group-hover:border-purple-500/50 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]" },
  rag: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20", glow: "group-hover:border-blue-500/50 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.15)]" },
  agentic: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/20", glow: "group-hover:border-cyan-500/50 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]" },
  "multi-agent": { bg: "bg-green-500/10", text: "text-green-400", border: "border-green-500/20", glow: "group-hover:border-green-500/50 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.15)]" },
  chatbot: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20", glow: "group-hover:border-amber-500/50 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.15)]" },
  "prompt-engineering": { bg: "bg-pink-500/10", text: "text-pink-400", border: "border-pink-500/20", glow: "group-hover:border-pink-500/50 group-hover:shadow-[0_0_15px_rgba(236,72,153,0.15)]" },
};

const IconMap: Record<string, any> = {
  database: Database,
  users: Users,
  bot: Bot,
  "message-square": MessageSquare,
  sparkles: Sparkles,
  network: Network,
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

export function AIProjects() {
  return (
    <section id="ai-projects" className="py-24 relative overflow-hidden bg-zinc-950/50">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-50 pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-50 pointer-events-none mix-blend-screen" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="mb-12">
          <SectionHeading label="AI & Machine Learning" title="Building the Future with AI" />
          <p className="text-center text-zinc-400 max-w-2xl mx-auto mt-4">
            From RAG systems to multi-agent architectures — exploring the cutting edge of AI engineering.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {AI_PROJECTS.map((project, index) => {
            const Icon = IconMap[project.icon] || Bot;
            const colors = categoryColors[project.category] || categoryColors.llm;
            // First two items span 2 columns on large screens
            const isLarge = index === 0 || index === 1;

            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className={cn(
                  "group relative",
                  isLarge && "md:col-span-2 lg:col-span-2"
                )}
              >
                <GlassCard
                  className={cn(
                    "h-full flex flex-col p-6 sm:p-8 transition-all duration-300",
                    "group-hover:-translate-y-1",
                    colors.glow
                  )}
                  spotlight={true}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className={cn("p-3 rounded-xl", colors.bg, colors.text)}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={cn(
                      "px-3 py-1 text-xs font-medium rounded-full border tracking-wide uppercase",
                      colors.bg, colors.text, colors.border
                    )}>
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-outfit font-bold text-white mb-3">
                    {project.title}
                  </h3>
                  
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="flex-1">
                    <ul className="space-y-2 mb-6">
                      {project.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                          <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                          <span className="leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-zinc-800/50 mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-[11px] font-medium text-zinc-400 bg-zinc-900/50 border border-zinc-800 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Neural network decorative pattern (subtle) */}
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none overflow-hidden">
                    <Network className="w-32 h-32 text-white transform rotate-12 translate-x-12 -translate-y-12" />
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
