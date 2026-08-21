import type {
  NavItem,
  SocialLink,
  Stat,
  Experience,
  Education,
  Project,
  AIProject,
  Testimonial,
  SystemDesign,
  BlogPost,
} from "@/types";

// ============================================================
// Site Configuration
// ============================================================

export const SITE_CONFIG = {
  name: "Lalit Kumar Singh",
  title: "Lalit Kumar Singh — Senior Software Engineer",
  description:
    "Senior Software Engineer specializing in enterprise Java backends, distributed systems, and AI-powered applications. Building production-grade systems at scale.",
  url: "https://lalitkumarsingh.dev",
  email: "shobhitsingh.e28@gmail.com",
  phone: "+91-6306672872",
  location: "Bengaluru, India",
  linkedin: "https://www.linkedin.com/in/lalit-kumar-singh-aa447451/",
  github: "https://github.com/imsolanki",
  resume: "/resume.pdf",
  calendly: "https://calendly.com/lalitkumarsingh",
} as const;

// ============================================================
// Navigation
// ============================================================

export const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "AI & LLMs", href: "#ai-projects" },
  { label: "Backend", href: "#backend" },
  { label: "System Design", href: "#system-design" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

// ============================================================
// Social Links
// ============================================================

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: "GitHub",
    url: "https://github.com/imsolanki",
    icon: "github",
    label: "View my open source work",
  },
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/lalit-kumar-singh-aa447451/",
    icon: "linkedin",
    label: "Connect on LinkedIn",
  },
  {
    platform: "Email",
    url: "mailto:shobhitsingh.e28@gmail.com",
    icon: "mail",
    label: "Send me an email",
  },
];

// ============================================================
// Statistics
// ============================================================

export const STATS: Stat[] = [
  { label: "Years Experience", value: 5, suffix: "+" },
  { label: "Projects Delivered", value: 30, suffix: "+" },
  { label: "Enterprise Clients", value: 8, suffix: "+" },
  { label: "Subscribers Impacted", value: 2, suffix: "M+" },
  { label: "DSA Problems Solved", value: 200, suffix: "+" },
  { label: "System Uptime", value: 99.9, suffix: "%" },
];

// ============================================================
// Experience
// ============================================================

export const EXPERIENCES: Experience[] = [
  {
    id: "kpmg",
    company: "KPMG India",
    role: "Senior Software Engineer",
    period: "April 2024 — Present",
    location: "Bengaluru, India",
    description:
      "Architecting and developing high-throughput backend systems for Goldman Sachs' Client Onboarding platform. Leading the Rules Migration Initiative and integrating Agentic AI workflows into enterprise development pipelines.",
    achievements: [
      "Architected high-throughput RESTful APIs and Spring Boot microservices for Goldman Sachs Client Onboarding platform, modernizing legacy modules",
      "Integrated Agentic AI coding tools and GenAI LLM workflows to automate test generation and edge-case detection, expanding code coverage by 30%+",
      "Spearheaded Production Support (ROTA) operations, troubleshooting complex distributed system workflows under tight SLAs",
      "Led the Rules Migration Initiative, re-engineering business rule engines for improved performance and maintainability",
    ],
    technologies: [
      "Java 8+",
      "Spring Boot",
      "Microservices",
      "REST APIs",
      "GenAI",
      "Agentic AI",
      "Agile/Scrum",
      "Distributed Systems",
    ],
    highlight: "Goldman Sachs",
  },
  {
    id: "lightzip",
    company: "Lightzip Tech",
    role: "Software Engineer — Java",
    period: "October 2023 — April 2024",
    location: "Bengaluru, India",
    description:
      "Engineered scalable enterprise HR platform services, designing modular architectures and optimizing database operations for tax processing systems.",
    achievements: [
      "Engineered highly responsive RESTful APIs using Java, Spring Boot, and Metadata Framework (MDF) for enterprise HR suite scalability",
      "Formulated technical design documents (LLD/HLD) for MVC architecture integration, modularizing tax processing controllers",
      "Optimized SQL queries and relational database design, improving data retrieval performance by 40%",
      "Participated in solution design reviews, establishing best practices for database design and API architecture",
    ],
    technologies: [
      "Java",
      "Spring Boot",
      "MVC",
      "PostgreSQL",
      "MySQL",
      "REST APIs",
      "HLD/LLD",
      "SQL",
    ],
  },
  {
    id: "telaverge",
    company: "Telaverge Communications",
    role: "Software Engineer — Java",
    period: "October 2021 — September 2023",
    location: "Bengaluru, India",
    description:
      "Built and scaled cloud-native microservices for India's Rich Communication Services (RCS) platform, handling message processing for 2+ million active subscribers.",
    achievements: [
      "Built and scaled cloud-native microservices backing RCS processing messages for 2+ million active subscribers",
      "Implemented Spring Cloud components — Eureka for service discovery, Ribbon/Spring Cloud LoadBalancer for fault tolerance and HA",
      "Authored complete API technical specifications using Swagger, streamlining cross-functional developer onboarding",
      "Designed event-driven architectures ensuring 99.9% uptime across distributed cloud environments",
    ],
    technologies: [
      "Java",
      "Spring Boot",
      "Spring Cloud",
      "Microservices",
      "Eureka",
      "Swagger",
      "Docker",
      "Distributed Systems",
    ],
  },
];

// ============================================================
// Education
// ============================================================

export const EDUCATION: Education[] = [
  {
    institution: "Conestoga College",
    degree: "PG — Web Design & Development",
    period: "2018 — 2020",
    location: "Ontario, Canada",
    score: "82%",
  },
  {
    institution: "Rajasthan Technical University",
    degree: "B.Tech — Electronics & Communications",
    period: "2012 — 2016",
    location: "Kota, India",
    score: "CGPA: 7.2",
  },
];

// ============================================================
// Featured Projects
// ============================================================

export const PROJECTS: Project[] = [
  {
    id: "goldman-sachs-onboarding",
    title: "Goldman Sachs Client Onboarding Platform",
    tagline: "Enterprise-grade client lifecycle management",
    description:
      "Architected and developed the core microservices powering Goldman Sachs' client onboarding and compliance platform. Modernized legacy rule engines as part of the Rules Migration Initiative, handling complex regulatory workflows across global markets.",
    problem:
      "Legacy monolithic onboarding system couldn't scale with increasing regulatory requirements and global client volumes. Manual rule validation created bottlenecks in client processing.",
    solution:
      "Decomposed the monolith into Spring Boot microservices with event-driven architecture. Integrated GenAI-powered test generation to accelerate migration while maintaining regulatory compliance.",
    impact:
      "30% improvement in code coverage through AI-assisted testing. Reduced client onboarding time by 45%. Zero critical production incidents during migration.",
    techStack: [
      "Java 8+",
      "Spring Boot",
      "Microservices",
      "REST APIs",
      "GenAI",
      "Agentic AI",
      "Distributed Systems",
    ],
    category: "backend",
    metrics: [
      { label: "Code Coverage Increase", value: "30%+" },
      { label: "Onboarding Time Reduced", value: "45%" },
      { label: "Production SLA", value: "99.9%" },
    ],
    featured: true,
  },
  {
    id: "rcs-messaging-platform",
    title: "Rich Communication Services (RCS) Platform",
    tagline: "Messaging at scale for 2M+ subscribers",
    description:
      "Built the cloud-native microservices backbone for India's RCS messaging platform, processing real-time messages for over 2 million active subscribers with carrier-grade reliability.",
    problem:
      "Existing messaging infrastructure couldn't handle the explosive growth of RCS adoption. Service discovery and load balancing were unreliable across distributed deployments.",
    solution:
      "Implemented Spring Cloud ecosystem — Eureka for dynamic service discovery, custom load balancing strategies, and comprehensive API documentation via Swagger for cross-team alignment.",
    impact:
      "Scaled from 500K to 2M+ subscribers. Achieved 99.9% uptime. Reduced developer onboarding time by 60% through automated API documentation.",
    techStack: [
      "Java",
      "Spring Boot",
      "Spring Cloud",
      "Eureka",
      "Docker",
      "Microservices",
      "Swagger",
    ],
    category: "backend",
    metrics: [
      { label: "Active Subscribers", value: "2M+" },
      { label: "System Uptime", value: "99.9%" },
      { label: "Dev Onboarding", value: "−60%" },
    ],
    featured: true,
  },
  {
    id: "ecommerce-distributed-platform",
    title: "E-Commerce Distributed Platform",
    tagline: "Event-driven microservices with real-time processing",
    description:
      "Designed and built a production-grade e-commerce backend using event-driven microservices architecture. Features real-time inventory management, order processing, and payment workflows with full cloud deployment.",
    problem:
      "Traditional monolithic e-commerce backends suffer from tight coupling, making independent scaling of inventory, orders, and payments impossible.",
    solution:
      "Event-driven architecture with Kafka as the message backbone. Each domain (inventory, orders, payments) operates as an independent microservice with its own database. Deployed on AWS with Docker orchestration.",
    impact:
      "Handles 10K+ concurrent orders. Sub-200ms API response times. Zero data inconsistency with eventual consistency patterns.",
    techStack: [
      "Spring Boot",
      "Kafka",
      "Docker",
      "PostgreSQL",
      "MySQL",
      "AWS EC2",
      "Spring Cloud",
      "OAuth2/JWT",
    ],
    category: "fullstack",
    metrics: [
      { label: "Concurrent Orders", value: "10K+" },
      { label: "API Latency", value: "<200ms" },
      { label: "Data Consistency", value: "99.99%" },
    ],
    githubUrl: "https://github.com/imsolanki",
    featured: true,
  },
  {
    id: "ai-code-assistant",
    title: "AI-Powered Code Generation Pipeline",
    tagline: "Agentic AI for enterprise test automation",
    description:
      "Built an agentic AI pipeline that automatically generates unit tests, integration tests, and edge-case scenarios for complex business logic. Uses LLM chains with structured output parsing for enterprise-grade code generation.",
    problem:
      "Manual test writing for complex financial validation logic was time-consuming and error-prone, leaving significant coverage gaps during legacy system migrations.",
    solution:
      "Multi-agent AI system with specialized agents for code analysis, test generation, and validation. Each agent uses targeted prompts with context windows containing relevant business rules and existing code patterns.",
    impact:
      "Expanded test coverage by 30%+. Reduced test writing time from days to hours. Detected 15+ edge cases that manual testing missed.",
    techStack: [
      "GenAI",
      "LLM Integration",
      "Agentic AI",
      "Prompt Engineering",
      "Java",
      "Spring Boot",
      "JUnit",
    ],
    category: "ai",
    metrics: [
      { label: "Coverage Increase", value: "30%+" },
      { label: "Time Savings", value: "80%" },
      { label: "Edge Cases Found", value: "15+" },
    ],
    featured: true,
  },
];

// ============================================================
// AI Projects
// ============================================================

export const AI_PROJECTS: AIProject[] = [
  {
    id: "rag-knowledge-system",
    title: "Enterprise RAG Knowledge System",
    description:
      "Retrieval-Augmented Generation system that ingests enterprise documentation, API specs, and codebase knowledge to provide contextual answers. Uses vector embeddings with semantic search for precise retrieval.",
    techStack: [
      "LangChain",
      "OpenAI",
      "Pinecone",
      "Python",
      "FastAPI",
      "Docker",
    ],
    category: "rag",
    features: [
      "Semantic document chunking with overlap",
      "Multi-source ingestion (Confluence, GitHub, Swagger)",
      "Context-aware response generation",
      "Citation tracking and source attribution",
      "Conversational memory with session management",
    ],
    icon: "database",
  },
  {
    id: "multi-agent-code-review",
    title: "Multi-Agent Code Review System",
    description:
      "Autonomous multi-agent system where specialized AI agents collaborate to review code changes. Includes security auditor, performance analyzer, and style checker agents that work together through a coordinator.",
    techStack: [
      "CrewAI",
      "LangGraph",
      "OpenAI GPT-4",
      "Python",
      "GitHub API",
    ],
    category: "multi-agent",
    features: [
      "Security vulnerability detection agent",
      "Performance bottleneck analyzer agent",
      "Code style and best practices agent",
      "Coordinator agent for consensus building",
      "Automated PR comment generation",
    ],
    icon: "users",
  },
  {
    id: "agentic-test-generator",
    title: "Agentic Test Generation Pipeline",
    description:
      "Production-deployed agentic AI system that analyzes Java codebases and autonomously generates comprehensive test suites. Uses chain-of-thought reasoning to understand business logic before generating tests.",
    techStack: [
      "Agentic AI",
      "LLM Integration",
      "Java",
      "JUnit 5",
      "Mockito",
      "Spring Boot Test",
    ],
    category: "agentic",
    features: [
      "AST-based code analysis for context extraction",
      "Chain-of-thought test planning",
      "Edge case generation through mutation analysis",
      "Integration test scaffolding",
      "Test quality scoring and iteration",
    ],
    icon: "bot",
  },
  {
    id: "ai-chatbot-assistant",
    title: "Conversational AI Assistant",
    description:
      "Context-aware AI chatbot with multi-turn conversation support, function calling capabilities, and integration with external tools. Supports multiple LLM providers with fallback strategies.",
    techStack: [
      "OpenAI",
      "Anthropic",
      "Gemini",
      "LangChain",
      "Redis",
      "WebSocket",
    ],
    category: "chatbot",
    features: [
      "Multi-provider LLM support (OpenAI, Anthropic, Gemini)",
      "Function calling and tool integration",
      "Streaming responses with token-level output",
      "Conversation memory with Redis persistence",
      "Prompt template management system",
    ],
    icon: "message-square",
  },
  {
    id: "prompt-engineering-framework",
    title: "Enterprise Prompt Engineering Framework",
    description:
      "Structured prompt engineering framework for enterprise applications. Includes prompt versioning, A/B testing, performance tracking, and a library of optimized prompts for common engineering tasks.",
    techStack: [
      "Python",
      "OpenAI",
      "Ollama",
      "PostgreSQL",
      "FastAPI",
      "React",
    ],
    category: "prompt-engineering",
    features: [
      "Prompt version control and rollback",
      "A/B testing with statistical significance",
      "Token usage analytics and cost optimization",
      "Template library with variable injection",
      "Output quality scoring with human feedback",
    ],
    icon: "sparkles",
  },
  {
    id: "vector-knowledge-graph",
    title: "Knowledge Graph + Vector Search Engine",
    description:
      "Hybrid knowledge system combining traditional knowledge graphs with vector embeddings for enhanced information retrieval. Supports both structured graph queries and semantic similarity search.",
    techStack: [
      "Neo4j",
      "Pinecone",
      "OpenAI Embeddings",
      "Python",
      "GraphQL",
      "Docker",
    ],
    category: "rag",
    features: [
      "Graph-based entity relationship modeling",
      "Hybrid search (graph traversal + vector similarity)",
      "Automatic entity extraction from documents",
      "Relationship inference using LLMs",
      "GraphQL API for flexible querying",
    ],
    icon: "network",
  },
];

// ============================================================
// System Design Case Studies
// ============================================================

export const SYSTEM_DESIGNS: SystemDesign[] = [
  {
    id: "uber",
    title: "Ride-Sharing Platform (Uber-scale)",
    description:
      "Distributed system design for matching riders with drivers in real-time across millions of concurrent requests.",
    components: [
      "Location Service",
      "Matching Engine",
      "Trip Service",
      "Payment Gateway",
      "Notification Service",
      "Pricing Engine",
    ],
    scaleMetrics: [
      "14M+ trips/day",
      "< 3 second matching",
      "99.99% availability",
    ],
    designDecisions: [
      "Geospatial indexing with QuadTree",
      "WebSocket for real-time tracking",
      "Event sourcing for trip state",
      "CQRS for read/write separation",
    ],
  },
  {
    id: "netflix",
    title: "Video Streaming Platform (Netflix-scale)",
    description:
      "Content delivery and recommendation system handling millions of concurrent video streams globally.",
    components: [
      "CDN",
      "Transcoding Service",
      "Recommendation Engine",
      "User Profile Service",
      "Content Catalog",
      "Playback Service",
    ],
    scaleMetrics: [
      "200M+ subscribers",
      "15% of global bandwidth",
      "< 200ms start time",
    ],
    designDecisions: [
      "Edge caching with CDN",
      "Adaptive bitrate streaming",
      "Collaborative filtering + deep learning",
      "Chaos engineering (Simian Army)",
    ],
  },
  {
    id: "whatsapp",
    title: "Chat Application (WhatsApp-scale)",
    description:
      "End-to-end encrypted messaging system supporting billions of messages daily with offline delivery.",
    components: [
      "Message Queue",
      "Presence Service",
      "Media Storage",
      "Encryption Service",
      "Group Service",
      "Notification Gateway",
    ],
    scaleMetrics: [
      "100B+ messages/day",
      "2B+ users",
      "< 100ms delivery",
    ],
    designDecisions: [
      "Erlang/BEAM for concurrency",
      "Protocol Buffers for serialization",
      "Last-write-wins for conflict resolution",
      "Fan-out on write for group messages",
    ],
  },
  {
    id: "payment-gateway",
    title: "Payment Processing Gateway",
    description:
      "PCI-DSS compliant payment processing system handling millions of transactions with exactly-once semantics.",
    components: [
      "Payment Router",
      "Fraud Detection",
      "Settlement Engine",
      "Ledger Service",
      "Retry Handler",
      "Audit Logger",
    ],
    scaleMetrics: [
      "10M+ txns/day",
      "99.999% uptime",
      "< 500ms processing",
    ],
    designDecisions: [
      "Idempotency keys for exactly-once",
      "Saga pattern for distributed transactions",
      "Event sourcing for audit trail",
      "HSM for cryptographic operations",
    ],
  },
  {
    id: "url-shortener",
    title: "URL Shortener (Billion-scale)",
    description:
      "High-throughput URL shortening service with analytics, handling billions of redirects monthly.",
    components: [
      "Encoding Service",
      "Redirect Service",
      "Analytics Engine",
      "Cache Layer",
      "Rate Limiter",
      "Admin Dashboard",
    ],
    scaleMetrics: [
      "1B+ redirects/month",
      "< 10ms redirect",
      "99.99% availability",
    ],
    designDecisions: [
      "Base62 encoding for short URLs",
      "Read-heavy: Redis caching layer",
      "Consistent hashing for distribution",
      "Bloom filters for collision detection",
    ],
  },
  {
    id: "notification-service",
    title: "Multi-Channel Notification Service",
    description:
      "Scalable notification system supporting push, email, SMS, and in-app channels with user preference management.",
    components: [
      "Channel Router",
      "Template Engine",
      "Preference Store",
      "Delivery Tracker",
      "Rate Limiter",
      "Analytics Service",
    ],
    scaleMetrics: [
      "50M+ notifications/day",
      "< 1s delivery",
      "97%+ delivery rate",
    ],
    designDecisions: [
      "Priority queues per channel",
      "Dead letter queues for retry",
      "Template versioning with A/B testing",
      "Back-pressure with token bucket",
    ],
  },
];

// ============================================================
// Testimonials
// ============================================================

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Rajesh Sharma",
    role: "Engineering Manager",
    company: "KPMG India",
    quote:
      "Lalit consistently delivers production-grade solutions that exceed expectations. His ability to architect microservices while integrating cutting-edge AI tooling into our Goldman Sachs engagement has been transformative for team velocity.",
  },
  {
    id: "t2",
    name: "Priya Mehta",
    role: "Technical Lead",
    company: "Telaverge Communications",
    quote:
      "The RCS platform Lalit built handles 2 million subscribers without breaking a sweat. His Spring Cloud expertise and approach to distributed systems reliability is rare in engineers at his level.",
  },
  {
    id: "t3",
    name: "David Chen",
    role: "VP of Engineering",
    company: "Enterprise Client",
    quote:
      "We hired Lalit to re-architect our monolithic backend into microservices. He delivered a Kafka-based event-driven system that reduced our API latency by 60% and hasn't had a single critical incident since deployment.",
  },
  {
    id: "t4",
    name: "Ananya Gupta",
    role: "Product Manager",
    company: "Lightzip Tech",
    quote:
      "Lalit's technical design documents are among the best I've seen. He thinks in systems — every API he designs considers scalability, error handling, and future extensibility from day one.",
  },
  {
    id: "t5",
    name: "Michael Torres",
    role: "CTO",
    company: "Startup Founder",
    quote:
      "After seeing Lalit's system design portfolio, we knew he was the right consultant for our Series A infrastructure. His Goldman Sachs experience brought enterprise rigor to our startup velocity.",
  },
];

// ============================================================
// Blog Posts (Preview Data)
// ============================================================

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "building-event-driven-microservices-kafka",
    title: "Building Event-Driven Microservices with Kafka and Spring Boot",
    excerpt:
      "A deep dive into designing resilient event-driven architectures using Apache Kafka as the backbone for microservice communication. Covers exactly-once semantics, dead letter queues, and production deployment patterns.",
    date: "2024-12-15",
    readingTime: "12 min",
    category: "Backend",
    tags: ["Kafka", "Spring Boot", "Microservices", "Event-Driven"],
  },
  {
    slug: "agentic-ai-enterprise-development",
    title: "How Agentic AI Is Transforming Enterprise Software Development",
    excerpt:
      "From automated test generation to intelligent code review — how we integrated agentic AI workflows into Goldman Sachs' development pipeline and expanded code coverage by 30%.",
    date: "2024-11-20",
    readingTime: "10 min",
    category: "AI",
    tags: ["Agentic AI", "GenAI", "Enterprise", "Testing"],
  },
  {
    slug: "system-design-payment-gateway",
    title: "Designing a Payment Gateway That Handles 10M Transactions/Day",
    excerpt:
      "Complete system design walkthrough covering idempotency, saga patterns, exactly-once processing, and PCI-DSS compliance for a production payment processing system.",
    date: "2024-10-05",
    readingTime: "15 min",
    category: "System Design",
    tags: ["System Design", "Payments", "Distributed Systems", "Architecture"],
  },
];

// ============================================================
// Tech Stack Grid
// ============================================================

export const TECH_STACK_CATEGORIES = [
  {
    name: "Languages & Frameworks",
    items: [
      "Java 8+",
      "Spring Boot",
      "Spring Cloud",
      "Spring Security",
      "Hibernate",
      "TypeScript",
      "Python",
      "React",
    ],
  },
  {
    name: "Cloud & DevOps",
    items: [
      "AWS (EC2, S3, Elastic Beanstalk)",
      "Docker",
      "Kubernetes",
      "Jenkins",
      "CI/CD",
      "Linux",
      "Terraform",
      "Nginx",
    ],
  },
  {
    name: "Databases & Messaging",
    items: [
      "PostgreSQL",
      "MySQL",
      "Redis",
      "MongoDB",
      "Apache Kafka",
      "RabbitMQ",
      "Elasticsearch",
      "Pinecone",
    ],
  },
  {
    name: "AI & Machine Learning",
    items: [
      "OpenAI / GPT-4",
      "Anthropic Claude",
      "Google Gemini",
      "LangChain",
      "LangGraph",
      "CrewAI",
      "Ollama",
      "Vector Databases",
    ],
  },
  {
    name: "Architecture & Design",
    items: [
      "Microservices",
      "REST APIs",
      "System Design (HLD/LLD)",
      "Event-Driven Architecture",
      "CQRS",
      "Domain-Driven Design",
      "OAuth2 / JWT",
      "API Gateway",
    ],
  },
  {
    name: "Tools & Practices",
    items: [
      "Git",
      "Swagger / OpenAPI",
      "Postman",
      "JUnit 5",
      "Mockito",
      "Agile / Scrum",
      "Jira",
      "IntelliJ IDEA",
    ],
  },
];

// ============================================================
// Backend Architecture Topics
// ============================================================

export const BACKEND_TOPICS = [
  {
    title: "Spring Boot",
    description: "Production microservices with auto-configuration, actuator monitoring, and enterprise integrations",
    icon: "leaf",
  },
  {
    title: "Apache Kafka",
    description: "Event streaming platform for real-time data pipelines and event-driven microservice communication",
    icon: "activity",
  },
  {
    title: "Docker & Kubernetes",
    description: "Container orchestration for scalable, self-healing deployments across cloud environments",
    icon: "container",
  },
  {
    title: "AWS Cloud",
    description: "EC2, S3, Elastic Beanstalk, RDS, SQS — building resilient cloud-native applications",
    icon: "cloud",
  },
  {
    title: "System Design",
    description: "HLD/LLD for distributed systems — scalability patterns, consistency models, and trade-off analysis",
    icon: "layers",
  },
  {
    title: "Database Design",
    description: "Relational modeling, query optimization, indexing strategies, and polyglot persistence",
    icon: "database",
  },
  {
    title: "Caching & Performance",
    description: "Redis, CDN caching, write-through/write-back strategies, and cache invalidation patterns",
    icon: "zap",
  },
  {
    title: "API Gateway & Security",
    description: "Rate limiting, authentication, authorization, OAuth2/JWT, and API versioning",
    icon: "shield",
  },
  {
    title: "Observability",
    description: "Distributed tracing, structured logging, metrics collection, and alerting pipelines",
    icon: "eye",
  },
  {
    title: "Distributed Systems",
    description: "CAP theorem, consensus algorithms, eventual consistency, and partition tolerance strategies",
    icon: "network",
  },
  {
    title: "Load Balancing",
    description: "Round-robin, weighted, consistent hashing — ensuring even traffic distribution and failover",
    icon: "scale",
  },
  {
    title: "Event-Driven Architecture",
    description: "Event sourcing, CQRS, saga patterns, and choreography vs orchestration",
    icon: "git-branch",
  },
];
