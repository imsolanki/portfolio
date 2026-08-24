"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 400);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 80);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-bg-primary"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Logo / Initials */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="relative">
              <motion.span
                className="text-5xl md:text-7xl font-bold tracking-tighter"
                style={{
                  background:
                    "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 50%, #06B6D4 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                LKS
              </motion.span>
              <motion.div
                className="absolute -inset-4 rounded-full opacity-20 blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-48 h-[2px] bg-surface-border rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, #8B5CF6, #3B82F6, #06B6D4)",
              }}
              initial={{ width: "0%" }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>

          {/* Loading Text */}
          <motion.p
            className="mt-4 text-xs text-text-muted tracking-widest uppercase font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Initializing
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
