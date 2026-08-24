"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Lightbulb, TrendingUp, Star } from "lucide-react";
import { GithubIcon } from "@/components/icons/social-icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { PROJECTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const TABS = ["All", "Backend", "AI", "Full Stack", "System Design"];

export function Projects() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProjects = PROJECTS.filter((project) => {
    if (activeTab === "All") return true;
    if (activeTab === "Backend" && project.category === "backend") return true;
    if (activeTab === "AI" && project.category === "ai") return true;
    if (activeTab === "Full Stack" && project.category === "fullstack") return true;
    if (activeTab === "System Design" && project.category === "system-design") return true;
    return false;
  });

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <SectionHeading label="Featured Work" title="Projects That Prove It" />

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "relative px-4 py-2 text-sm font-medium rounded-full transition-colors",
                activeTab === tab ? "text-white" : "text-text-muted hover:text-text-secondary"
              )}
            >
              <span className="relative z-10">{tab}</span>
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="h-full group"
              >
                <GlassCard
                  spotlight={true}
                  className="h-full flex flex-col overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_8px_30px_rgba(139,92,246,0.12)] group-hover:border-border-hover"
                >
                  {/* Top Header */}
                  <div className="relative h-48 w-full bg-gradient-to-br from-bg-tertiary to-bg-primary flex items-center justify-center p-6 border-b border-border">
                    <div className="absolute top-4 right-4 flex gap-2">
                      <span className="px-3 py-1 text-xs font-medium bg-bg-secondary/80 text-text-secondary rounded-full border border-border-hover/50 backdrop-blur-sm uppercase tracking-wider">
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="px-3 py-1 text-xs font-medium bg-amber-500/10 text-amber-500 rounded-full border border-amber-500/20 backdrop-blur-sm flex items-center gap-1 uppercase tracking-wider">
                          <Star className="w-3 h-3 fill-amber-500" /> Featured
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-outfit font-bold text-text-primary text-center">
                      {project.title}
                    </h3>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-text-muted text-sm mb-6">{project.tagline}</p>

                    {/* Problem / Solution / Impact Flow */}
                    <div className="space-y-4 mb-6">
                      <div className="flex gap-3">
                        <div className="mt-0.5 w-5 h-5 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
                          <Target className="w-3 h-3" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">Problem</h4>
                          <p className="text-sm text-text-muted leading-relaxed">{project.problem}</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="mt-0.5 w-5 h-5 rounded-full bg-cyan-500/10 text-cyan-500 flex items-center justify-center shrink-0">
                          <Lightbulb className="w-3 h-3" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">Solution</h4>
                          <p className="text-sm text-text-muted leading-relaxed">{project.solution}</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="mt-0.5 w-5 h-5 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center shrink-0">
                          <TrendingUp className="w-3 h-3" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">Impact</h4>
                          <p className="text-sm text-text-muted leading-relaxed">{project.impact}</p>
                        </div>
                      </div>
                    </div>

                    {/* Metrics Row */}
                    {project.metrics && (
                      <div className="grid grid-cols-3 gap-2 mb-6">
                        {project.metrics.map((metric, i) => (
                          <div key={i} className="bg-bg-secondary/50 rounded-lg p-2 text-center border border-border/50">
                            <div className="text-lg font-bold text-text-primary mb-0.5">{metric.value}</div>
                            <div className="text-[10px] text-text-muted uppercase tracking-wider leading-tight">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-auto">
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 text-xs font-medium text-text-secondary bg-bg-secondary border border-border rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      {project.githubUrl && (
                        <div className="flex items-center gap-3 pt-4 border-t border-border">
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-bg-secondary border border-border text-text-muted hover:text-text-primary hover:border-border-hover transition-colors"
                            aria-label="GitHub Repository"
                          >
                            <GithubIcon className="w-5 h-5" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
