"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SUGGESTED_QUESTIONS = [
  "What's your tech stack?",
  "Tell me about your AI experience",
  "What enterprise projects have you worked on?",
  "Are you available for freelance?",
  "What's your system design expertise?",
  "Tell me about your education",
  "What are your strengths?",
  "Can I see your resume?",
];

// Comprehensive AI-powered knowledge base about Lalit's career
const KNOWLEDGE_BASE: { patterns: string[]; response: string }[] = [
  // Greetings
  {
    patterns: ["hello", "hi", "hey", "greetings", "good morning", "good evening", "howdy", "sup", "what's up", "hola"],
    response: `Hey there! 👋 I'm Lalit's AI portfolio assistant. I can help you learn about:\n\n• **Experience & career** — 5+ years in enterprise engineering\n• **Tech stack & skills** — Java, Spring Boot, AI/ML, Cloud\n• **Projects** — Goldman Sachs, RCS Platform, AI pipelines\n• **Availability & rates** — Freelance, consulting, contracts\n• **Education & certifications** — Canada, India\n• **System design** — Uber, Netflix, WhatsApp scale\n\nWhat would you like to know?`,
  },

  // Tech Stack
  {
    patterns: ["tech stack", "technologies", "skills", "what do you use", "programming", "languages", "frameworks", "tools", "what can you do", "technical skills", "proficiency"],
    response: `**Core Tech Stack:**\n\n🔧 **Backend:** Java 8+, Spring Boot, Microservices, REST APIs, Spring Cloud, Hibernate\n☁️ **Cloud & DevOps:** AWS (EC2, S3, EB), Docker, Kubernetes, Jenkins, CI/CD, GitHub Actions\n🗄️ **Databases:** PostgreSQL, MySQL, Redis, MongoDB, Kafka, Elasticsearch\n🤖 **AI/ML:** OpenAI, Anthropic, LangChain, LangGraph, CrewAI, RAG, Vector DBs, Prompt Engineering\n📐 **Architecture:** System Design (HLD/LLD), Event-Driven, CQRS, DDD, Saga Pattern\n🌐 **Frontend:** React, Next.js, TypeScript, Tailwind CSS\n🔒 **Security:** OAuth2, JWT, Spring Security, PCI-DSS awareness\n\nLalit specializes in building **production-grade backend systems** and **AI-powered applications** at enterprise scale.`,
  },

  // AI Experience
  {
    patterns: ["ai", "artificial intelligence", "llm", "genai", "agentic", "machine learning", "openai", "gpt", "langchain", "rag", "vector", "embedding", "prompt engineering", "chatgpt", "claude", "anthropic", "gemini"],
    response: `**AI & LLM Expertise:**\n\n🤖 **Agentic AI:** Built multi-agent systems for automated code review and test generation at Goldman Sachs/KPMG — expanded code coverage by **30%+**\n📚 **RAG Systems:** Enterprise knowledge retrieval with vector embeddings, semantic search, and document processing pipelines\n🔗 **LLM Integration:** Multi-provider support — OpenAI GPT-4, Anthropic Claude, Google Gemini, Ollama (local models)\n🧠 **Prompt Engineering:** Structured frameworks with A/B testing, version control, and chain-of-thought reasoning\n👥 **Multi-Agent Orchestration:** Collaborative AI agents using CrewAI and LangGraph for complex workflows\n📊 **AI Tools:** LangChain, LangGraph, CrewAI, Pinecone, Weaviate, ChromaDB\n\nLalit believes the future of software engineering is **AI-augmented**, and he's actively building it in production environments.`,
  },

  // Enterprise / Goldman Sachs / KPMG
  {
    patterns: ["enterprise", "goldman sachs", "kpmg", "corporate", "banking", "financial", "client onboarding", "current job", "current role", "present", "what are you working on"],
    response: `**Enterprise Experience — KPMG → Goldman Sachs:**\n\n🏦 **Role:** Senior Software Engineer (April 2024 — Present)\n📍 **Location:** Bengaluru, India\n🎯 **Engagement:** Goldman Sachs Client Onboarding Platform\n\n**What Lalit does:**\n• Architects high-throughput RESTful APIs and Spring Boot microservices\n• Leads the **Rules Migration Initiative** — re-engineering legacy business rule engines\n• Integrated **Agentic AI** workflows for automated test generation\n• Handles Production Support (ROTA) under tight SLAs\n\n📊 **Key Impact:**\n• 30%+ code coverage improvement via AI\n• Zero critical production incidents during migration\n• Reduced client onboarding time by 45%\n\nLalit brings **Goldman Sachs-level quality** and enterprise rigor to every engagement.`,
  },

  // Telaverge
  {
    patterns: ["telaverge", "rcs", "messaging", "telecom", "communications", "subscribers", "cloud native"],
    response: `**Telaverge Communications (Oct 2021 — Sep 2023):**\n\n📱 **Role:** Software Engineer — Java\n📍 **Location:** Bengaluru, India\n🎯 **Project:** India's Rich Communication Services (RCS) Platform\n\n**Highlights:**\n• Built and scaled **cloud-native microservices** processing messages for **2M+ active subscribers**\n• Implemented Spring Cloud components — Eureka (service discovery), Ribbon (load balancing)\n• Designed **event-driven architectures** ensuring **99.9% uptime**\n• Authored complete API technical specifications with Swagger\n\nThis role gave Lalit deep expertise in **distributed systems**, **high-availability architectures**, and **telecom-grade reliability**.`,
  },

  // Lightzip
  {
    patterns: ["lightzip", "hr platform", "tax processing", "hr suite"],
    response: `**Lightzip Tech (Oct 2023 — Apr 2024):**\n\n💼 **Role:** Software Engineer — Java\n📍 **Location:** Bengaluru, India\n🎯 **Project:** Enterprise HR Platform\n\n**Highlights:**\n• Engineered RESTful APIs using Java, Spring Boot, and Metadata Framework (MDF)\n• Created technical design documents (LLD/HLD) for MVC architecture\n• Modularized tax processing controllers\n• Optimized SQL queries — **40% improvement** in data retrieval performance\n• Established best practices for database design and API architecture\n\nThis role sharpened Lalit's skills in **enterprise architecture** and **performance optimization**.`,
  },

  // Freelance / Availability
  {
    patterns: ["freelance", "available", "hire", "hiring", "availability", "consultant", "open to work", "looking for", "engagement", "contract", "part time", "part-time"],
    response: `**Availability & Engagement:**\n\n✅ **Currently available for:**\n• **Freelance Projects** — Backend systems, API development, AI integrations\n• **Consulting** — System design, architecture reviews, AI strategy\n• **Part-time Contracts** — Flexible engagement models\n• **Technical Advisory** — CTO-as-a-service for startups\n\n⏰ **Response Time:** Typically within 24 hours\n🌏 **Remote-friendly:** Works across EST, PST, GMT, IST time zones\n\n📧 **Get in touch:**\n• Email: shobhitsingh.e28@gmail.com\n• Phone: +91-6306672872\n• LinkedIn: linkedin.com/in/lalit-kumar-singh-aa447451/\n• Or scroll down to the **Contact** section!\n\n📅 You can also **Book a Call** on Calendly!`,
  },

  // Hourly Rate / Pricing
  {
    patterns: ["rate", "price", "cost", "pricing", "hourly", "budget", "charge", "fee", "how much", "salary", "compensation", "pay", "ctc", "package"],
    response: `**Engagement Pricing:**\n\n💼 **Consulting:** Starting at **$150/hour**\n🏗️ **Project-based:** Custom quotes based on scope and complexity\n📋 **Retainer:** Monthly retainer packages available for ongoing work\n🤝 **Full-time:** Open to discussing competitive full-time offers for the right opportunity\n\n**Factors that influence pricing:**\n• Project complexity and timeline\n• Technology stack requirements\n• Team size and collaboration needs\n• Long-term vs. short-term engagement\n\nLalit works with clients ranging from **startups to Fortune 500 companies**.\n\n📧 For a custom quote: shobhitsingh.e28@gmail.com`,
  },

  // System Design
  {
    patterns: ["system design", "architecture", "scalable", "distributed", "hld", "lld", "design pattern", "microservice architecture", "high level design", "low level design"],
    response: `**System Design Expertise:**\n\n📐 Lalit has designed systems for:\n• **Ride-sharing** (Uber-scale) — Geospatial indexing, real-time matching, surge pricing\n• **Video Streaming** (Netflix-scale) — CDN, adaptive bitrate, recommendation engine\n• **Messaging** (WhatsApp-scale) — E2E encryption, offline delivery, read receipts\n• **Payment Processing** — Exactly-once semantics, PCI-DSS compliance, idempotency\n• **URL Shortening** (Billion-scale) — Base62 encoding, Redis caching, analytics\n\n🔧 **Patterns & Principles:**\nEvent Sourcing, CQRS, Saga Pattern, Consistent Hashing, Circuit Breaker, API Gateway, Service Mesh, Database Sharding\n\n🏆 He regularly practices system design for **FAANG-level interviews** and applies these patterns in real client architectures.`,
  },

  // Projects
  {
    patterns: ["project", "portfolio", "work", "built", "created", "what have you built", "show me your work", "case study"],
    response: `**Featured Projects:**\n\n1. 🏦 **Goldman Sachs Client Onboarding** — Enterprise microservices platform modernization with AI-augmented development\n2. 📱 **RCS Messaging Platform** — Cloud-native messaging for 2M+ subscribers with 99.9% uptime\n3. 🛒 **E-Commerce Distributed Platform** — Event-driven with Kafka, Docker, AWS\n4. 🤖 **AI Code Generation Pipeline** — Agentic AI for enterprise test automation (30%+ coverage boost)\n5. 📚 **Enterprise RAG System** — Multi-provider LLM with semantic search\n6. 👥 **Multi-Agent AI Framework** — Collaborative AI agents using CrewAI & LangGraph\n\nEach project demonstrates **production-grade engineering** at scale. Scroll down to see full case studies with problem → solution → impact breakdowns!`,
  },

  // Experience / Background / Career
  {
    patterns: ["experience", "background", "career", "years", "work history", "resume summary", "professional", "journey", "career path", "how long"],
    response: `**Professional Journey — 5+ Years:**\n\n📅 **Career Timeline:**\n1. 🏦 **KPMG → Goldman Sachs** (Apr 2024 — Present)\n   Senior SWE — Client Onboarding, Rules Migration, Agentic AI\n2. 💼 **Lightzip Tech** (Oct 2023 — Apr 2024)\n   Java SWE — Enterprise HR Platform, SQL optimization\n3. 📱 **Telaverge Communications** (Oct 2021 — Sep 2023)\n   Java SWE — RCS messaging, 2M+ subscribers, 99.9% uptime\n\n🌏 **International:** Studied & worked in Ontario, Canada (2018-2020)\n🧩 **200+ DSA problems** solved on LeetCode & HackerRank\n💡 **Domains:** FinTech, Telecom, HR Tech, E-Commerce, AI/ML\n\nLalit combines **deep technical expertise** with **real-world production experience**.`,
  },

  // Education
  {
    patterns: ["education", "degree", "university", "college", "study", "studied", "school", "qualification", "academic", "conestoga", "rajasthan", "btech", "b.tech", "pgdm"],
    response: `**Education:**\n\n🎓 **PG — Web Design & Development**\nConestoga College, Ontario, Canada (2018 — 2020)\nScore: 82%\n\n🎓 **B.Tech — Electronics & Communications Engineering**\nRajasthan Technical University, Kota, India (2012 — 2016)\nCGPA: 7.2\n\n📚 **Continuous Learning:**\n• AWS Cloud practitioner concepts\n• System Design for large-scale systems\n• AI/ML and LLM integration courses\n• 200+ DSA problems on LeetCode & HackerRank\n\nLalit believes in **lifelong learning** and continuously upskills in emerging technologies.`,
  },

  // Certifications
  {
    patterns: ["certification", "certified", "aws certified", "certificate", "credentials", "accredited"],
    response: `**Certifications & Learning:**\n\nWhile Lalit doesn't currently hold formal cloud certifications, his expertise is demonstrated through:\n\n☁️ **AWS:** Production experience with EC2, S3, Elastic Beanstalk, and cloud-native deployments\n🐳 **Docker & Kubernetes:** Hands-on container orchestration in production\n🤖 **AI/ML:** Working knowledge of OpenAI, LangChain, RAG systems deployed in enterprise\n📐 **System Design:** FAANG-level preparation with real-world application\n\n**He's currently pursuing:**\n• AWS Solutions Architect Associate\n• AI/ML specialization certifications\n\nHis **production experience** across multiple Fortune 500 engagements speaks louder than certificates! 💪`,
  },

  // DSA / Coding / LeetCode
  {
    patterns: ["dsa", "leetcode", "hackerrank", "coding", "algorithm", "data structure", "competitive programming", "problem solving", "coding challenge"],
    response: `**DSA & Problem Solving:**\n\n🧩 **200+ problems** solved across LeetCode & HackerRank\n\n**Focus Areas:**\n• Arrays, Strings, Sliding Window\n• Trees, Graphs, BFS/DFS\n• Dynamic Programming\n• System Design (HLD/LLD)\n• Greedy & Backtracking\n\n**Approach:**\nLalit practices DSA not just for interviews but to write **more efficient production code**. His optimization of SQL queries at Lightzip (40% improvement) and event-driven architecture design at Telaverge directly benefit from strong algorithmic thinking.\n\n💡 He's actively growing this number and aims for 500+ by end of year!`,
  },

  // Strengths / Soft Skills / Why Hire
  {
    patterns: ["strength", "soft skill", "why hire", "why should i", "what makes you special", "unique", "stand out", "differentiator", "value", "why you", "what sets you apart"],
    response: `**Why Hire Lalit?**\n\n🏆 **Key Differentiators:**\n\n1. **Enterprise + AI** — Rare combination of Goldman Sachs-level enterprise engineering AND cutting-edge AI/LLM expertise\n2. **Production-Proven** — Every skill is battle-tested in production, not just tutorials\n3. **Full-Stack Backend** — From system design → implementation → deployment → monitoring\n4. **Scale Experience** — Built systems serving 2M+ users with 99.9% uptime\n5. **AI-Augmented Development** — Actively uses and builds AI tools to 10x productivity\n\n💡 **Soft Skills:**\n• Clear technical communication\n• Cross-functional collaboration (worked with PMs, QA, DevOps, business stakeholders)\n• Mentoring junior developers\n• Agile/Scrum methodology\n• Production support under pressure (Goldman Sachs ROTA)\n\nLalit doesn't just write code — he **engineers solutions**.`,
  },

  // Team / Collaboration / Leadership
  {
    patterns: ["team", "collaboration", "leadership", "lead", "manage", "mentor", "team size", "cross functional", "agile", "scrum"],
    response: `**Team & Leadership Experience:**\n\n👥 **Team Dynamics:**\n• Worked in teams of **5-15 engineers** across all roles\n• Cross-functional collaboration with PMs, QA, DevOps, and business stakeholders\n• **Mentored** junior developers on best practices and code reviews\n\n📋 **Methodologies:**\n• Agile/Scrum with 2-week sprints\n• Daily standups, sprint planning, retrospectives\n• JIRA for task management\n• Git-based code review workflows\n\n🏆 **Leadership Highlights:**\n• Led the Rules Migration Initiative at KPMG/Goldman Sachs\n• Spearheaded Production Support (ROTA) operations\n• Authored technical design documents that became team standards\n• Drove adoption of AI tools across the development team\n\nLalit is a **collaborative leader** who elevates the entire team's performance.`,
  },

  // Open Source / GitHub
  {
    patterns: ["open source", "github", "contributions", "repos", "repository", "oss"],
    response: `**Open Source & GitHub:**\n\n💻 **GitHub:** github.com/imsolanki\n📊 **Stats:**\n• 45+ repositories\n• 1.2k+ stars earned\n• 850+ contributions in the past year\n\n**Notable Contributions:**\n• Backend system templates and boilerplates\n• AI/LLM integration examples\n• System design documentation\n• Spring Boot starter projects\n\nLalit believes in giving back to the community and regularly shares his learnings through open source code and technical blog posts.`,
  },

  // Resume / CV
  {
    patterns: ["resume", "cv", "download resume", "pdf", "curriculum vitae"],
    response: `**Resume / CV:**\n\n📄 You can download Lalit's resume directly from this website!\n\n**Quick Summary:**\n• **5+ years** of production engineering experience\n• **3 major companies** — KPMG (Goldman Sachs), Lightzip Tech, Telaverge\n• **Core:** Java, Spring Boot, Microservices, AI/LLM, System Design\n• **Education:** PG from Conestoga College (Canada), B.Tech from RTU (India)\n\nLook for the **"Download Resume"** link in the navigation, or use the keyboard shortcut **⌘K** → "Download Resume" in the command palette!\n\n📧 Or request an updated copy at: shobhitsingh.e28@gmail.com`,
  },

  // Location / Remote
  {
    patterns: ["location", "where", "based", "country", "city", "india", "remote", "onsite", "hybrid", "relocation", "relocate", "visa", "work permit"],
    response: `**Location & Work Preferences:**\n\n📍 **Based in:** Bengaluru, India\n🌏 **International experience:** Ontario, Canada (2018-2020)\n\n💻 **Work Preferences:**\n• ✅ Remote — Fully available for global remote work\n• ✅ Hybrid — Open to hybrid arrangements in Bengaluru\n• ✅ Time zones — Flexible with EST, PST, GMT, IST\n• 🤔 Relocation — Open to discussing for the right opportunity\n\n**Visa/Travel:**\n• Previous Canadian study/work visa experience\n• Indian passport — can obtain business visas as needed\n\nLalit has experience working with **distributed teams across time zones** and communicates effectively in async environments.`,
  },

  // Contact
  {
    patterns: ["contact", "reach", "email", "phone", "connect", "get in touch", "talk", "call", "message", "book", "consultation", "calendly", "schedule"],
    response: `**Get In Touch:**\n\n📧 **Email:** shobhitsingh.e28@gmail.com\n📱 **Phone:** +91-6306672872\n🔗 **LinkedIn:** linkedin.com/in/lalit-kumar-singh-aa447451/\n💻 **GitHub:** github.com/imsolanki\n📍 **Location:** Bengaluru, India\n\n📅 **Book a Call:** Use the "Book a Call" button on the homepage or visit Calendly directly!\n\n💬 **Preferred contact:** Email for project inquiries, LinkedIn for networking\n⏰ **Response time:** Usually within 24 hours\n\nScroll to the **Contact section** to send a message directly!`,
  },

  // Cloud / DevOps / AWS / Docker
  {
    patterns: ["cloud", "aws", "docker", "kubernetes", "k8s", "devops", "ci/cd", "jenkins", "deployment", "infrastructure", "containerization"],
    response: `**Cloud & DevOps Expertise:**\n\n☁️ **AWS Services:**\n• EC2 (compute), S3 (storage), Elastic Beanstalk (deployment)\n• CloudWatch (monitoring), IAM (security)\n• Production deployments serving enterprise clients\n\n🐳 **Containerization:**\n• Docker for microservices packaging\n• Kubernetes for container orchestration\n• Docker Compose for local development\n\n🔄 **CI/CD:**\n• Jenkins pipelines for automated testing and deployment\n• GitHub Actions for open source projects\n• Blue-green and canary deployment strategies\n\n📊 **Monitoring:** CloudWatch, ELK Stack, application-level logging\n\nLalit has deployed and maintained **production systems** on cloud infrastructure serving millions of users.`,
  },

  // Database
  {
    patterns: ["database", "sql", "postgres", "postgresql", "mysql", "redis", "mongodb", "kafka", "elasticsearch", "data", "storage", "nosql", "cache"],
    response: `**Database & Data Expertise:**\n\n🗄️ **Relational Databases:**\n• PostgreSQL — Primary choice for complex queries and ACID compliance\n• MySQL — Enterprise HR systems, financial data\n• Query optimization — **40% performance improvement** at Lightzip\n\n⚡ **NoSQL & Caching:**\n• Redis — Session management, caching, pub/sub\n• MongoDB — Document-based storage for flexible schemas\n• Elasticsearch — Full-text search and analytics\n\n📨 **Message Queues:**\n• Apache Kafka — Event-driven architectures, stream processing\n• RabbitMQ — Task queues and async processing\n\n📐 **Design Patterns:**\n• Database sharding for horizontal scaling\n• Read replicas for high-read workloads\n• CQRS for separating read/write models\n• Event Sourcing for audit trails`,
  },

  // Blog
  {
    patterns: ["blog", "article", "write", "writing", "technical blog", "post", "content"],
    response: `**Technical Blog:**\n\nLalit writes deep-dive technical articles on:\n\n📝 **Recent Posts:**\n1. **Building Event-Driven Microservices with Kafka** — Architecture patterns for real-time data processing\n2. **Agentic AI in Enterprise Development** — How AI agents are transforming software engineering\n3. **System Design: Payment Gateway at Scale** — Designing for millions of transactions\n\n**Topics covered:** Microservices, AI/LLM, System Design, Java, Spring Boot, Cloud Architecture\n\nScroll to the **Blog section** to read the full articles!`,
  },

  // Hobbies / Personal / Fun
  {
    patterns: ["hobby", "hobbies", "fun", "free time", "interests", "personal", "outside work", "when not coding", "life outside"],
    response: `**Beyond Code:**\n\n🧩 **Problem Solving:** Solving DSA problems on LeetCode (200+ and counting)\n📐 **System Design:** Designing the next distributed system architecture for fun\n📚 **Learning:** Exploring cutting-edge AI papers and tools\n✍️ **Writing:** Technical blog posts and architecture documentation\n🏋️ **Fitness:** Believes in work-life balance\n🌍 **Travel:** Loves exploring new places — has lived in India and Canada\n\nLalit is a **lifelong learner** who finds the intersection of engineering and AI genuinely exciting.`,
  },

  // Thank you / Goodbye
  {
    patterns: ["thank", "thanks", "bye", "goodbye", "see you", "that's all", "great", "awesome", "helpful", "appreciate", "nice", "cool", "perfect"],
    response: `You're welcome! 😊 Glad I could help!\n\nHere's a quick recap of how to connect with Lalit:\n\n📧 **Email:** shobhitsingh.e28@gmail.com\n📱 **Phone:** +91-6306672872\n🔗 **LinkedIn:** linkedin.com/in/lalit-kumar-singh-aa447451/\n📅 **Book a Call:** Click the "Book a Call" button on the homepage\n\nFeel free to ask more questions anytime — I'm here 24/7! 🤖`,
  },

  // Who are you / About the bot
  {
    patterns: ["who are you", "what are you", "are you ai", "are you real", "chatbot", "bot", "assistant"],
    response: `I'm Lalit's **AI Portfolio Assistant** 🤖\n\nI'm a smart rule-based assistant built right into this portfolio to help you learn about Lalit's career, skills, and availability — without waiting for a reply!\n\n**I can answer questions about:**\n• Career history & experience\n• Technical skills & tech stack\n• AI/ML expertise\n• System design knowledge\n• Availability & pricing\n• Education & background\n• Projects & case studies\n• Contact information\n\nThink of me as Lalit's always-available digital representative! 😄\n\n💡 For complex discussions, reach out directly at **shobhitsingh.e28@gmail.com**`,
  },

  // Java / Spring Boot specific
  {
    patterns: ["java", "spring boot", "spring", "spring cloud", "hibernate", "jpa", "spring security", "microservices"],
    response: `**Java & Spring Boot Mastery:**\n\n☕ **Java Experience:**\n• Java 8+ with 5+ years of production experience\n• Functional programming with Streams, Lambdas, Optional\n• Multi-threading and concurrent programming\n• JVM tuning and performance optimization\n\n🍃 **Spring Ecosystem:**\n• **Spring Boot** — Core framework for all microservices\n• **Spring Cloud** — Eureka, Ribbon, Config Server, Gateway\n• **Spring Security** — OAuth2, JWT, role-based access\n• **Spring Data JPA** — Hibernate, complex queries, pagination\n• **Spring WebFlux** — Reactive programming concepts\n\n🏗️ **Microservices Patterns:**\n• API Gateway, Service Discovery, Circuit Breaker\n• Distributed tracing, centralized logging\n• Event-driven communication via Kafka\n• 12-factor app methodology\n\nJava and Spring Boot are Lalit's **bread and butter** — his strongest technical competency.`,
  },

  // Frontend
  {
    patterns: ["frontend", "front-end", "react", "next.js", "nextjs", "typescript", "tailwind", "css", "html", "javascript", "ui", "ux"],
    response: `**Frontend Capabilities:**\n\nWhile Lalit is primarily a **backend specialist**, he has solid frontend skills:\n\n⚛️ **React & Next.js** — This very portfolio is built with Next.js 16!\n📝 **TypeScript** — Type-safe development\n🎨 **Tailwind CSS** — Rapid UI development\n🎬 **Framer Motion** — Smooth animations\n🖥️ **Three.js** — 3D graphics (used in this portfolio)\n\n**Note:** Lalit's core strength is **backend + AI**. For frontend-heavy projects, he typically collaborates with dedicated frontend engineers while owning the API layer, system design, and backend architecture.\n\nThis portfolio itself demonstrates his full-stack capabilities! 🚀`,
  },

  // Interview / Job
  {
    patterns: ["interview", "job", "position", "opening", "opportunity", "role", "join", "offer"],
    response: `**Interested in working with Lalit?**\n\n🎯 **Ideal Roles:**\n• Senior/Staff Software Engineer (Backend)\n• AI/ML Engineer\n• Solutions Architect\n• Technical Lead\n• Backend Consultant\n\n✅ **Open to:**\n• Full-time positions (right opportunity)\n• Freelance/contract work\n• Consulting engagements\n• Technical advisory roles\n\n📋 **Interview-ready:**\n• System Design (HLD/LLD)\n• DSA (200+ problems solved)\n• Behavioral & leadership\n• AI/ML architecture discussions\n\n📧 **Next step:** Send details about the role to **shobhitsingh.e28@gmail.com** and Lalit will respond within 24 hours!`,
  },
];

// Fuzzy matching: calculate simple similarity score
function similarity(a: string, b: string): number {
  const aLower = a.toLowerCase();
  const bLower = b.toLowerCase();
  if (aLower === bLower) return 1;
  if (aLower.includes(bLower) || bLower.includes(aLower)) return 0.8;

  // Check word overlap
  const aWords = aLower.split(/\s+/);
  const bWords = new Set(bLower.split(/\s+/));
  let matches = 0;
  for (const word of aWords) {
    if (word.length < 3) continue;
    for (const bWord of bWords) {
      if (bWord.length < 3) continue;
      // Substring match (handles typos like "exprience" matching "experience")
      if (bWord.includes(word.slice(0, Math.max(3, word.length - 2))) ||
          word.includes(bWord.slice(0, Math.max(3, bWord.length - 2)))) {
        matches++;
        break;
      }
    }
  }
  return aWords.length > 0 ? matches / Math.max(aWords.length, 1) : 0;
}

function getAIResponse(input: string): string {
  const lowerInput = input.toLowerCase().trim();

  // Exact pattern matching first
  for (const entry of KNOWLEDGE_BASE) {
    if (entry.patterns.some((pattern) => lowerInput.includes(pattern))) {
      return entry.response;
    }
  }

  // Fuzzy matching as fallback
  let bestMatch = { score: 0, response: "" };
  for (const entry of KNOWLEDGE_BASE) {
    for (const pattern of entry.patterns) {
      const score = similarity(lowerInput, pattern);
      if (score > bestMatch.score) {
        bestMatch = { score, response: entry.response };
      }
    }
  }

  if (bestMatch.score >= 0.4) {
    return bestMatch.response;
  }

  return `That's a great question! I don't have a specific answer for that, but I'm happy to help with anything about Lalit's career. Here are some things I know well:\n\n💼 **Career** — "Tell me about your experience"\n🔧 **Tech Stack** — "What technologies do you use?"\n🤖 **AI Work** — "Tell me about your AI experience"\n🏦 **Enterprise** — "Tell me about Goldman Sachs"\n📐 **System Design** — "System design expertise"\n📧 **Contact** — "How can I reach Lalit?"\n🎓 **Education** — "Where did you study?"\n💪 **Why Hire** — "Why should I hire you?"\n\nOr reach out directly at **shobhitsingh.e28@gmail.com** 📧`;
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! 👋 I'm Lalit's AI portfolio assistant. Ask me anything about his experience, tech stack, projects, AI expertise, or availability!\n\nTry asking: **\"What's your tech stack?\"** or **\"Why should I hire you?\"**",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim() || isTyping) return;

      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content: text.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsTyping(true);

      // Simulate AI thinking delay
      setTimeout(() => {
        const response = getAIResponse(text);
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          role: "assistant",
          content: response,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
        setIsTyping(false);
        setTimeout(() => {
          inputRef.current?.focus();
        }, 50);
      }, 600 + Math.random() * 800);
    },
    [isTyping]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  // Show suggestions periodically (at start and every 6 messages)
  const showSuggestions = messages.length <= 2 || (messages.length > 2 && messages.length % 6 === 0);
  // Rotate which suggestions to show based on message count
  const suggestionOffset = Math.floor(messages.length / 6) * 3;
  const visibleSuggestions = SUGGESTED_QUESTIONS.slice(
    suggestionOffset % SUGGESTED_QUESTIONS.length,
    (suggestionOffset % SUGGESTED_QUESTIONS.length) + 4
  );
  // Wrap around if needed
  const suggestions = visibleSuggestions.length < 4
    ? [...visibleSuggestions, ...SUGGESTED_QUESTIONS.slice(0, 4 - visibleSuggestions.length)]
    : visibleSuggestions;

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-[90] flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300",
          isOpen
            ? "bg-bg-tertiary hover:bg-bg-tertiary"
            : "bg-gradient-to-r from-accent-purple to-accent-blue hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageSquare className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification dot */}
        {!isOpen && (
          <motion.span
            className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-bg-primary"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Chat Window — Full screen on mobile, floating card on desktop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            onWheel={(e) => e.stopPropagation()}
            className={cn(
              "fixed z-[90] flex flex-col border border-surface-border bg-bg-secondary/95 backdrop-blur-2xl shadow-2xl overflow-hidden",
              // Mobile: full screen
              "inset-0 rounded-none",
              // Desktop: floating card
              "sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[400px] sm:h-[540px] sm:max-h-[calc(100vh-8rem)] sm:rounded-2xl"
            )}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-surface-border bg-bg-secondary safe-area-top">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-accent-purple to-accent-blue">
                <Bot className="w-5 h-5 text-white" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-bg-secondary" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-text-primary">
                  AI Portfolio Assistant
                </h3>
                <p className="text-xs text-text-muted">
                  <Sparkles className="inline w-3 h-3 mr-1 text-accent-purple" />
                  Ask me anything about Lalit&apos;s career
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-surface transition-colors"
              >
                <X className="w-5 h-5 text-text-muted" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex gap-2",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {msg.role === "assistant" && (
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center mt-0.5">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                      msg.role === "user"
                        ? "bg-gradient-to-r from-accent-purple to-accent-blue text-white rounded-br-md"
                        : "bg-surface text-text-secondary border border-surface-border rounded-bl-md"
                    )}
                  >
                    {msg.content.split("\n").map((line, i) => (
                      <span key={i}>
                        {line
                          .replace(/\*\*(.*?)\*\*/g, "⟨b⟩$1⟨/b⟩")
                          .split(/⟨\/?b⟩/)
                          .map((part, j) =>
                            j % 2 === 1 ? (
                              <strong key={j} className="font-semibold">
                                {part}
                              </strong>
                            ) : (
                              <span key={j}>{part}</span>
                            )
                          )}
                        {i < msg.content.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                  {msg.role === "user" && (
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-bg-tertiary flex items-center justify-center mt-0.5">
                      <User className="w-3.5 h-3.5 text-text-secondary" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 items-start"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="bg-surface border border-surface-border rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-2 h-2 rounded-full bg-text-muted"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions — shown periodically */}
            {showSuggestions && !isTyping && (
              <div className="px-4 pb-2">
                <div className="flex gap-1.5 flex-wrap">
                  {suggestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-xs px-2.5 py-1.5 rounded-full border border-surface-border text-text-secondary hover:bg-surface hover:text-text-primary transition-all active:scale-95"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 px-4 py-3 border-t border-surface-border safe-area-bottom"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about Lalit's career..."
                className="flex-1 bg-surface rounded-xl px-3.5 py-2.5 text-sm text-text-primary placeholder-text-muted outline-none border border-surface-border focus:border-accent-purple/50 transition-colors min-w-0"
                disabled={isTyping}
              />
              <motion.button
                type="submit"
                disabled={!input.trim() || isTyping}
                className={cn(
                  "flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl transition-all",
                  input.trim() && !isTyping
                    ? "bg-gradient-to-r from-accent-purple to-accent-blue text-white"
                    : "bg-surface text-text-muted"
                )}
                whileHover={input.trim() ? { scale: 1.05 } : {}}
                whileTap={input.trim() ? { scale: 0.95 } : {}}
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
