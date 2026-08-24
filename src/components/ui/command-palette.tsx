"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Home,
  User,
  Briefcase,
  Code2,
  Brain,
  Server,
  Layout,
  Mail,
  Moon,
  Sun,
  FileText,
  MessageSquare,
  X,
  Command,
  BookOpen,
  BarChart3,
  Phone,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { GithubIcon, LinkedinIcon } from "@/components/icons/social-icons";

interface CommandItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  shortcut?: string;
  group: string;
  action: () => void;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { setTheme, theme } = useTheme();

  const scrollTo = useCallback((id: string) => {
    setOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 150);
  }, []);

  const commands: CommandItem[] = [
    {
      id: "home",
      label: "Go to Home",
      icon: <Home className="w-4 h-4" />,
      group: "Navigation",
      action: () => {
        setOpen(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
    },
    {
      id: "about",
      label: "About Me",
      icon: <User className="w-4 h-4" />,
      group: "Navigation",
      action: () => scrollTo("about"),
    },
    {
      id: "projects",
      label: "Featured Projects",
      icon: <Briefcase className="w-4 h-4" />,
      group: "Navigation",
      action: () => scrollTo("projects"),
    },
    {
      id: "experience",
      label: "Experience",
      icon: <Code2 className="w-4 h-4" />,
      group: "Navigation",
      action: () => scrollTo("experience"),
    },
    {
      id: "ai",
      label: "AI & LLM Projects",
      icon: <Brain className="w-4 h-4" />,
      group: "Navigation",
      action: () => scrollTo("ai-projects"),
    },
    {
      id: "backend",
      label: "Backend Expertise",
      icon: <Server className="w-4 h-4" />,
      group: "Navigation",
      action: () => scrollTo("backend"),
    },
    {
      id: "system-design",
      label: "System Design",
      icon: <Layout className="w-4 h-4" />,
      group: "Navigation",
      action: () => scrollTo("system-design"),
    },
    {
      id: "blog",
      label: "Technical Blog",
      icon: <BookOpen className="w-4 h-4" />,
      group: "Navigation",
      action: () => scrollTo("blog"),
    },
    {
      id: "stats",
      label: "Statistics",
      icon: <BarChart3 className="w-4 h-4" />,
      group: "Navigation",
      action: () => scrollTo("statistics"),
    },
    {
      id: "contact",
      label: "Contact",
      icon: <MessageSquare className="w-4 h-4" />,
      group: "Navigation",
      action: () => scrollTo("contact"),
    },
    {
      id: "github",
      label: "Open GitHub Profile",
      icon: <GithubIcon className="w-4 h-4" />,
      shortcut: "⌘G",
      group: "Links",
      action: () => {
        setOpen(false);
        window.open("https://github.com/imsolanki", "_blank");
      },
    },
    {
      id: "linkedin",
      label: "Open LinkedIn",
      icon: <LinkedinIcon className="w-4 h-4" />,
      shortcut: "⌘L",
      group: "Links",
      action: () => {
        setOpen(false);
        window.open(
          "https://www.linkedin.com/in/lalit-kumar-singh-aa447451/",
          "_blank"
        );
      },
    },
    {
      id: "email",
      label: "Send Email",
      icon: <Mail className="w-4 h-4" />,
      shortcut: "⌘E",
      group: "Links",
      action: () => {
        setOpen(false);
        window.location.href = "mailto:shobhitsingh.e28@gmail.com";
      },
    },
    {
      id: "phone",
      label: "Call Me",
      icon: <Phone className="w-4 h-4" />,
      group: "Links",
      action: () => {
        setOpen(false);
        window.location.href = "tel:+916306672872";
      },
    },
    {
      id: "resume",
      label: "Download Resume",
      icon: <FileText className="w-4 h-4" />,
      shortcut: "⌘R",
      group: "Links",
      action: () => {
        setOpen(false);
        window.open("/resume.pdf", "_blank");
      },
    },
    {
      id: "theme",
      label: theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode",
      icon:
        theme === "dark" ? (
          <Sun className="w-4 h-4" />
        ) : (
          <Moon className="w-4 h-4" />
        ),
      shortcut: "⌘T",
      group: "Actions",
      action: () => {
        setTheme(theme === "dark" ? "light" : "dark");
        setOpen(false);
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );

  const groups = Array.from(
    new Set(filteredCommands.map((cmd) => cmd.group))
  );

  // Keyboard shortcut to open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        setSearch("");
        setSelectedIndex(0);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handleNav = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : 0
        );
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredCommands.length - 1
        );
      }
      if (e.key === "Enter" && filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    };
    window.addEventListener("keydown", handleNav);
    return () => window.removeEventListener("keydown", handleNav);
  }, [open, filteredCommands, selectedIndex]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  let globalIndex = -1;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100] bg-bg-primary/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[101] flex items-start justify-center pt-[20vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onWheel={(e) => e.stopPropagation()}
              className="w-full max-w-lg mx-4 overflow-hidden rounded-2xl border border-surface-border bg-bg-secondary/95 backdrop-blur-2xl shadow-2xl"
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 border-b border-surface-border">
                <Search className="w-5 h-5 text-text-muted" />
                <input
                  type="text"
                  placeholder="Type a command or search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 py-4 bg-transparent text-text-primary placeholder-text-muted outline-none text-sm"
                  autoFocus
                />
                <button
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center w-6 h-6 rounded border border-surface-border text-text-muted hover:text-text-primary transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>

              {/* Commands List */}
              <div className="max-h-[300px] overflow-y-auto py-2">
                {filteredCommands.length === 0 ? (
                  <div className="px-4 py-8 text-center text-text-muted text-sm">
                    No results found.
                  </div>
                ) : (
                  groups.map((group) => (
                    <div key={group}>
                      <div className="px-4 py-1.5 text-xs font-medium text-text-muted uppercase tracking-wider">
                        {group}
                      </div>
                      {filteredCommands
                        .filter((cmd) => cmd.group === group)
                        .map((cmd) => {
                          globalIndex++;
                          const idx = globalIndex;
                          return (
                            <button
                              key={cmd.id}
                              onClick={cmd.action}
                              onMouseEnter={() => setSelectedIndex(idx)}
                              className={cn(
                                "w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors",
                                idx === selectedIndex
                                  ? "bg-surface text-text-primary"
                                  : "text-text-secondary hover:bg-surface hover:text-text-primary"
                              )}
                            >
                              <span
                                className={cn(
                                  "flex-shrink-0",
                                  idx === selectedIndex
                                    ? "text-accent-purple"
                                    : "text-text-muted"
                                )}
                              >
                                {cmd.icon}
                              </span>
                              <span className="flex-1">{cmd.label}</span>
                              {cmd.shortcut && (
                                <span className="text-xs text-text-muted font-mono">
                                  {cmd.shortcut}
                                </span>
                              )}
                            </button>
                          );
                        })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-2 border-t border-surface-border text-[10px] text-text-muted">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded border border-surface-border bg-surface font-mono">
                      ↑↓
                    </kbd>
                    Navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded border border-surface-border bg-surface font-mono">
                      ↵
                    </kbd>
                    Select
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded border border-surface-border bg-surface font-mono">
                      esc
                    </kbd>
                    Close
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Command className="w-3 h-3" />
                  <span>Command Palette</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
