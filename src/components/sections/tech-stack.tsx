"use client";

import { motion } from "framer-motion";
import { TECH_STACK_CATEGORIES } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

const categoryColors = [
  "border-blue-500/20 bg-blue-500/5",
  "border-emerald-500/20 bg-emerald-500/5",
  "border-purple-500/20 bg-purple-500/5",
  "border-cyan-500/20 bg-cyan-500/5",
  "border-amber-500/20 bg-amber-500/5",
  "border-rose-500/20 bg-rose-500/5",
];

const badgeColors = [
  "hover:border-blue-500/50 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)]",
  "hover:border-emerald-500/50 hover:shadow-[0_0_10px_rgba(16,185,129,0.3)]",
  "hover:border-purple-500/50 hover:shadow-[0_0_10px_rgba(139,92,246,0.3)]",
  "hover:border-cyan-500/50 hover:shadow-[0_0_10px_rgba(6,182,212,0.3)]",
  "hover:border-amber-500/50 hover:shadow-[0_0_10px_rgba(245,158,11,0.3)]",
  "hover:border-rose-500/50 hover:shadow-[0_0_10px_rgba(244,63,94,0.3)]",
];

export function TechStack() {
  const allTech = TECH_STACK_CATEGORIES.flatMap((c) => c.items);
  
  return (
    <section id="tech-stack" className="py-24 relative overflow-hidden bg-bg-primary/50">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          label="Technologies"
          title="My Engineering Toolkit"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
        >
          {TECH_STACK_CATEGORIES.map((category, index) => {
            const colorTheme = categoryColors[index % categoryColors.length];
            const badgeTheme = badgeColors[index % badgeColors.length];

            return (
              <motion.div
                key={category.name}
                variants={categoryVariants}
                className={cn(
                  "p-6 rounded-2xl border border-border/60 backdrop-blur-sm",
                  colorTheme
                )}
              >
                <h3 className="text-xl font-bold text-text-primary mb-6 font-heading">
                  {category.name}
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <motion.div
                      key={item}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-sm font-medium bg-bg-secondary/80 text-text-secondary border border-border-hover/50 transition-all duration-300 cursor-default",
                        badgeTheme
                      )}
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Optional Marquee for Visual Interest */}
      <div className="mt-20 flex overflow-hidden mask-horizontal-edges select-none pointer-events-none opacity-40">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          className="flex whitespace-nowrap min-w-max gap-8 px-4"
        >
          {[...allTech, ...allTech].map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="text-2xl md:text-4xl font-bold text-text-muted font-heading tracking-wider"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Add a global style for the mask if not present in tailwind config */}
      <style dangerouslySetInnerHTML={{ __html: `
        .mask-horizontal-edges {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}} />
    </section>
  );
}
