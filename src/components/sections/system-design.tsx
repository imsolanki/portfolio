"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SYSTEM_DESIGNS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";
import { ArrowRight, Lightbulb, TrendingUp, Cpu, Server } from "lucide-react";

export function SystemDesign() {
  const [activeTab, setActiveTab] = useState(SYSTEM_DESIGNS[0].id);

  const activeDesign = SYSTEM_DESIGNS.find((d) => d.id === activeTab) || SYSTEM_DESIGNS[0];

  return (
    <section id="system-design" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          label="System Design"
          title="Designing Systems at Scale"
        />

        <div className="mt-12 flex flex-col items-center">
          {/* Tab Navigation */}
          <div className="flex w-full overflow-x-auto pb-4 mb-8 hide-scrollbar snap-x">
            <div className="flex gap-2 mx-auto min-w-max">
              {SYSTEM_DESIGNS.map((design) => {
                const isActive = activeTab === design.id;
                return (
                  <button
                    key={design.id}
                    onClick={() => setActiveTab(design.id)}
                    className={cn(
                      "relative px-4 py-2 rounded-full text-sm font-medium transition-colors snap-center",
                      isActive
                        ? "text-text-primary"
                        : "text-text-muted hover:text-text-secondary hover:bg-bg-tertiary/50"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute inset-0 bg-bg-tertiary rounded-full"
                        style={{ borderBottom: "2px solid #8B5CF6" }}
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{design.title.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Design Content */}
          <div className="w-full max-w-5xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDesign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard className="p-6 md:p-10 border-border/60 bg-bg-secondary/30">
                  <div className="mb-8">
                    <h3 className="text-2xl md:text-3xl font-bold font-heading text-text-primary mb-2">
                      {activeDesign.title}
                    </h3>
                    <p className="text-text-muted text-lg">{activeDesign.description}</p>
                  </div>

                  {/* Components Flow */}
                  <div className="mb-12 overflow-x-auto hide-scrollbar pb-4">
                    <div className="flex items-center min-w-max gap-3">
                      {activeDesign.components.map((component, idx) => (
                        <React.Fragment key={component}>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex flex-col items-center justify-center bg-bg-tertiary/50 border border-border-hover rounded-lg px-4 py-3 min-w-[120px] text-center"
                          >
                            <Server className="w-5 h-5 mb-2 text-purple-400" />
                            <span className="text-sm font-medium text-text-primary">
                              {component}
                            </span>
                          </motion.div>
                          
                          {idx < activeDesign.components.length - 1 && (
                            <motion.div
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: "auto" }}
                              transition={{ delay: idx * 0.1 + 0.1 }}
                              className="text-text-muted"
                            >
                              <ArrowRight className="w-5 h-5" />
                            </motion.div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Scale Metrics */}
                    <div>
                      <h4 className="flex items-center text-lg font-bold text-text-primary mb-4">
                        <TrendingUp className="w-5 h-5 mr-2 text-cyan-400" />
                        Scale Metrics
                      </h4>
                      <div className="flex flex-col gap-3">
                        {activeDesign.scaleMetrics.map((metric, i) => (
                          <div
                            key={i}
                            className="bg-bg-tertiary/40 border border-border-hover/50 rounded-lg p-3 flex items-center"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-3" />
                            <span className="text-text-secondary text-sm">{metric}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Design Decisions */}
                    <div>
                      <h4 className="flex items-center text-lg font-bold text-text-primary mb-4">
                        <Lightbulb className="w-5 h-5 mr-2 text-amber-400" />
                        Design Decisions
                      </h4>
                      <ul className="space-y-3">
                        {activeDesign.designDecisions.map((decision, i) => (
                          <li key={i} className="flex items-start text-sm text-text-secondary">
                            <Cpu className="w-4 h-4 mr-2 mt-0.5 text-text-muted shrink-0" />
                            <span>{decision}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// Add React import since we use React.Fragment
import React from "react";
