// ============================================================
// Portfolio Type Definitions
// ============================================================

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
}

export interface Skill {
  name: string;
  category: SkillCategory;
  icon?: string;
  proficiency?: number; // 0-100
}

export type SkillCategory =
  | "language"
  | "framework"
  | "database"
  | "cloud"
  | "devops"
  | "ai"
  | "tool"
  | "methodology";

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  techStack: string[];
  category: ProjectCategory;
  metrics: ProjectMetric[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  image?: string;
}

export type ProjectCategory = "backend" | "ai" | "fullstack" | "system-design";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
  highlight?: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  location: string;
  score: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar?: string;
}

export interface AIProject {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  category: AICategory;
  features: string[];
  icon: string;
}

export type AICategory =
  | "llm"
  | "rag"
  | "agentic"
  | "multi-agent"
  | "chatbot"
  | "prompt-engineering";

export interface SystemDesign {
  id: string;
  title: string;
  description: string;
  components: string[];
  scaleMetrics: string[];
  designDecisions: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  tags: string[];
  content?: string;
}

export interface TechStackItem {
  name: string;
  icon: string;
  category: string;
  color?: string;
}

export interface CommandItem {
  id: string;
  label: string;
  shortcut?: string;
  icon?: string;
  action: () => void;
  group: string;
}
