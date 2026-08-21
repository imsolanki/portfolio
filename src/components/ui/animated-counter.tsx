"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform, animate } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  label,
  duration = 2,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, {
        duration: duration,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
      });
      return () => controls.stop();
    }
  }, [inView, value, duration, count]);

  return (
    <div ref={ref} className={cn("flex flex-col items-center justify-center", className)}>
      <div className="flex items-baseline gap-1 text-5xl md:text-6xl font-heading font-bold text-zinc-100">
        {prefix && <span className="text-3xl text-purple-400">{prefix}</span>}
        <motion.span>{rounded}</motion.span>
        {suffix && <span className="text-3xl text-blue-400">{suffix}</span>}
      </div>
      <span className="mt-2 text-sm md:text-base text-zinc-400 font-medium tracking-wide uppercase">
        {label}
      </span>
    </div>
  );
}
