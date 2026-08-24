"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <motion.div variants={item} className="flex items-center gap-2">
        <div className="h-px w-6 bg-purple-500" />
        <span className="text-sm font-semibold tracking-wider text-purple-400 uppercase">
          {label}
        </span>
        {align === "center" && <div className="h-px w-6 bg-purple-500" />}
      </motion.div>

      <motion.h2
        variants={item}
        className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-text-primary tracking-tight"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          variants={item}
          className="text-lg text-text-muted max-w-2xl mt-2 leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
