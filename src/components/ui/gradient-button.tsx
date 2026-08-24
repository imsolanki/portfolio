"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface GradientButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export function GradientButton({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  icon,
  className,
}: GradientButtonProps) {
  const baseClasses = "relative inline-flex items-center justify-center rounded-full font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-bg-primary overflow-hidden group";
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm gap-2",
    md: "px-6 py-3 text-base gap-2.5",
    lg: "px-8 py-4 text-lg gap-3",
  };

  const variants = {
    primary: "text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]",
    secondary: "bg-bg-secondary border border-border text-text-primary hover:bg-bg-tertiary hover:border-border-hover",
    outline: "border border-transparent bg-transparent text-text-primary",
  };

  const content = (
    <>
      {variant === "primary" && (
        <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500 opacity-90 transition-opacity group-hover:opacity-100" />
      )}
      {variant === "outline" && (
        <span className="absolute inset-0 rounded-full border border-purple-500/50 group-hover:border-purple-400 transition-colors" />
      )}
      
      <span className="relative z-10 flex items-center gap-inherit">
        {children}
        {icon && (
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            {icon}
          </span>
        )}
      </span>
      
      {variant === "primary" && (
        <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-400 to-cyan-400 opacity-0 transition-opacity duration-300 group-hover:opacity-20 blur-xl" />
      )}
    </>
  );

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { type: "spring" as const, stiffness: 400, damping: 10 },
  };

  if (href) {
    return (
      <Link href={href} passHref legacyBehavior>
        <motion.a
          {...motionProps}
          className={cn(baseClasses, sizeClasses[size], variants[variant], className)}
          onClick={onClick}
        >
          {content}
        </motion.a>
      </Link>
    );
  }

  return (
    <motion.button
      {...motionProps}
      onClick={onClick}
      className={cn(baseClasses, sizeClasses[size], variants[variant], className)}
    >
      {content}
    </motion.button>
  );
}
