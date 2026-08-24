"use client";

import { motion } from "framer-motion";
import { BACKEND_TOPICS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";
import {
  Leaf,
  Database,
  Activity,
  Cloud,
  Box,
  Server,
  Lock,
  Cpu,
  Network,
  Settings,
  Code
} from "lucide-react";
import React from "react";

const iconMap: Record<string, any> = {
  leaf: Leaf,
  database: Database,
  activity: Activity,
  cloud: Cloud,
  container: Box,
  server: Server,
  lock: Lock,
  cpu: Cpu,
  network: Network,
  settings: Settings,
  code: Code,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

const borderGradients = [
  "from-emerald-500/50",
  "from-blue-500/50",
  "from-purple-500/50",
  "from-cyan-500/50",
  "from-pink-500/50",
  "from-amber-500/50",
  "from-indigo-500/50",
  "from-rose-500/50",
];

export function BackendExpertise() {
  return (
    <section id="backend" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          label="Backend Engineering"
          title="Architecture That Scales"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
        >
          {BACKEND_TOPICS.map((topic, index) => {
            const Icon = iconMap[topic.icon] || Server;
            const gradientClass = borderGradients[index % borderGradients.length];

            return (
              <motion.div key={topic.title} variants={itemVariants}>
                <GlassCard
                  className={cn(
                    "h-full p-6 relative overflow-hidden group cursor-pointer transition-all duration-300",
                    "hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]"
                  )}
                >
                  {/* Subtle left border gradient */}
                  <div
                    className={cn(
                      "absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b to-transparent opacity-50 group-hover:opacity-100 transition-opacity",
                      gradientClass
                    )}
                  />

                  <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-bg-secondary/50 border border-border text-text-secondary group-hover:text-purple-400 group-hover:border-purple-500/30 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold font-heading mb-3 text-text-primary">
                    {topic.title}
                  </h3>
                  
                  <p className="text-sm text-text-muted leading-relaxed group-hover:text-text-secondary transition-colors">
                    {topic.description}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
