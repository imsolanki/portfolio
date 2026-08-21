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
  "What's your hourly rate?",
  "Tell me about your system design expertise",
];

// AI-powered knowledge base about Lalit
const KNOWLEDGE_BASE: Record<string, string> = {
  // Greetings
  "hello|hi|hey|greetings": `Hey there! 👋 I'm Lalit's AI assistant. I can help you learn about his experience, tech stack, availability, and projects. What would you like to know?`,

  // Tech Stack
  "tech stack|technologies|skills|what do you use|programming":
    `**Core Tech Stack:**\n\n🔧 **Backend:** Java 8+, Spring Boot, Microservices, REST APIs, Spring Cloud\n☁️ **Cloud & DevOps:** AWS (EC2, S3, EB), Docker, Kubernetes, Jenkins, CI/CD\n🗄️ **Databases:** PostgreSQL, MySQL, Redis, MongoDB, Kafka\n🤖 **AI/ML:** OpenAI, Anthropic, LangChain, LangGraph, CrewAI, RAG, Vector DBs\n📐 **Architecture:** System Design (HLD/LLD), Event-Driven, CQRS, DDD\n\nLalit specializes in building production-grade backend systems and AI-powered applications at enterprise scale.`,

  // AI Experience
  "ai|artificial intelligence|llm|genai|agentic|machine learning":
    `**AI & LLM Expertise:**\n\n🤖 **Agentic AI:** Built multi-agent systems for automated code review and test generation at Goldman Sachs/KPMG\n📚 **RAG Systems:** Enterprise knowledge retrieval with vector embeddings and semantic search\n🔗 **LLM Integration:** Multi-provider support (OpenAI, Anthropic, Gemini, Ollama)\n🧠 **Prompt Engineering:** Structured frameworks with A/B testing and version control\n👥 **Multi-Agent:** Collaborative AI agents using CrewAI and LangGraph\n\nAt KPMG, Lalit expanded code coverage by **30%+** using Agentic AI workflows for test generation.`,

  // Enterprise / Goldman Sachs
  "enterprise|goldman sachs|kpmg|corporate|banking|financial":
    `**Enterprise Experience:**\n\n🏦 **KPMG → Goldman Sachs** (2024 - Present)\nSenior Software Engineer architecting the Client Onboarding platform. Leading the Rules Migration Initiative with AI-augmented development.\n\n📊 **Key Impact:**\n- Modernized legacy rule engines into Spring Boot microservices\n- 30%+ code coverage improvement via Agentic AI\n- Zero critical production incidents during migration\n- Production Support (ROTA) under tight SLAs\n\nLalit brings enterprise rigor and Goldman Sachs-level quality to every project.`,

  // Freelance / Availability
  "freelance|available|hire|hiring|availability|consultant":
    `**Availability & Engagement:**\n\n✅ Currently available for:\n- **Freelance Projects** — Backend systems, API development, AI integrations\n- **Consulting** — System design, architecture reviews, AI strategy\n- **Part-time Contracts** — Flexible engagement models\n\n💰 **Rate:** Starting at $150/hour for consulting engagements\n\n📧 **Get in touch:**\n- Email: shobhitsingh.e28@gmail.com\n- LinkedIn: linkedin.com/in/lalit-kumar-singh-aa447451/\n- Or use the contact form below!\n\nLalit typically responds within 24 hours.`,

  // Hourly Rate / Pricing
  "rate|price|cost|pricing|hourly|budget|charge":
    `**Engagement Pricing:**\n\n💼 **Consulting:** Starting at $150/hour\n🏗️ **Project-based:** Custom quotes based on scope and complexity\n📋 **Retainer:** Monthly retainer packages available for ongoing work\n\nPricing depends on project complexity, timeline, and engagement type. Lalit works with clients ranging from startups to Fortune 500 companies.\n\n📧 For a custom quote, reach out at shobhitsingh.e28@gmail.com`,

  // System Design
  "system design|architecture|scalable|distributed|hld|lld":
    `**System Design Expertise:**\n\n📐 Lalit has designed systems for:\n- **Ride-sharing** (Uber-scale) — Geospatial indexing, real-time matching\n- **Video Streaming** (Netflix-scale) — CDN, adaptive bitrate, recommendations\n- **Messaging** (WhatsApp-scale) — E2E encryption, offline delivery\n- **Payment Processing** — Exactly-once semantics, PCI-DSS compliance\n- **URL Shortening** (Billion-scale) — Base62 encoding, Redis caching\n\n🔧 Patterns: Event Sourcing, CQRS, Saga Pattern, Consistent Hashing, Circuit Breaker\n\nHe regularly practices system design for FAANG-level interviews and client architectures.`,

  // Projects
  "project|portfolio|work|built|created":
    `**Featured Projects:**\n\n1. 🏦 **Goldman Sachs Client Onboarding** — Enterprise microservices platform modernization\n2. 📱 **RCS Messaging Platform** — Cloud-native messaging for 2M+ subscribers (99.9% uptime)\n3. 🛒 **E-Commerce Distributed Platform** — Event-driven with Kafka, Docker, AWS\n4. 🤖 **AI Code Generation Pipeline** — Agentic AI for enterprise test automation (30%+ coverage)\n\nEach project demonstrates production-grade engineering at scale. Scroll down to see full case studies!`,

  // Experience / Background
  "experience|background|career|years|work history":
    `**Professional Journey:**\n\n📅 **5+ years** of production engineering experience\n\n🏢 **Career Timeline:**\n1. **KPMG** (2024-Present) — Senior SWE, Goldman Sachs engagement\n2. **Lightzip Tech** (2023-2024) — Java SWE, Enterprise HR platform\n3. **Telaverge Communications** (2021-2023) — Java SWE, RCS messaging\n\n🎓 **Education:**\n- PG Web Design & Dev — Conestoga College, Canada (82%)\n- B.Tech ECE — Rajasthan Technical University (7.2 CGPA)\n\n🧩 **200+ DSA problems** solved on LeetCode & HackerRank`,

  // Location
  "location|where|based|country|city|india|remote":
    `📍 **Based in:** Bengaluru, India\n🌏 **International experience:** Studied and worked in Ontario, Canada (2018-2020)\n💻 **Remote-friendly:** Available for remote work with global clients across time zones\n\nLalit has experience working with distributed teams and can align with EST, PST, GMT, or IST schedules.`,

  // Contact
  "contact|reach|email|phone|connect":
    `**Get In Touch:**\n\n📧 Email: shobhitsingh.e28@gmail.com\n📱 Phone: +91-6306672872\n🔗 LinkedIn: linkedin.com/in/lalit-kumar-singh-aa447451/\n💻 GitHub: github.com/imsolanki\n📍 Location: Bengaluru, India\n\nScroll to the contact section to book a consultation or send a message!`,
};

function getAIResponse(input: string): string {
  const lowerInput = input.toLowerCase().trim();

  for (const [patterns, response] of Object.entries(KNOWLEDGE_BASE)) {
    const patternList = patterns.split("|");
    if (patternList.some((pattern) => lowerInput.includes(pattern))) {
      return response;
    }
  }

  return `Great question! While I'm a rule-based assistant (not connected to a live AI API), I can help with:\n\n• **Tech stack & skills** — "What technologies do you use?"\n• **AI experience** — "Tell me about your AI work"\n• **Enterprise projects** — "What enterprise projects have you worked on?"\n• **Availability & rates** — "Are you available for freelance?"\n• **System design** — "Tell me about your system design expertise"\n• **Contact info** — "How can I reach Lalit?"\n\nFor anything specific, reach out directly at **shobhitsingh.e28@gmail.com** 📧`;
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! 👋 I'm Lalit's AI portfolio assistant. Ask me anything about his experience, tech stack, projects, or availability. How can I help you today?",
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
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
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
        // Re-focus input so user can ask another question
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

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-[90] flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300",
          isOpen
            ? "bg-[#27272A] hover:bg-[#3F3F46]"
            : "bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]"
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
            className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#09090B]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            onWheel={(e) => e.stopPropagation()}
            className="fixed bottom-24 right-6 z-[90] w-[380px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-8rem)] flex flex-col rounded-2xl border border-white/10 bg-[#18181B]/95 backdrop-blur-2xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-[#18181B]">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6]">
                <Bot className="w-5 h-5 text-white" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#18181B]" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-[#FAFAFA]">
                  AI Portfolio Assistant
                </h3>
                <p className="text-xs text-[#71717A]">
                  <Sparkles className="inline w-3 h-3 mr-1 text-[#8B5CF6]" />
                  Ask me about Lalit&apos;s work
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="w-4 h-4 text-[#71717A]" />
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
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] flex items-center justify-center mt-0.5">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                      msg.role === "user"
                        ? "bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white rounded-br-md"
                        : "bg-white/5 text-[#E4E4E7] border border-white/5 rounded-bl-md"
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
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#27272A] flex items-center justify-center mt-0.5">
                      <User className="w-3.5 h-3.5 text-[#A1A1AA]" />
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
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="bg-white/5 border border-white/5 rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-2 h-2 rounded-full bg-[#71717A]"
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

            {/* Suggested Questions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2">
                <div className="flex gap-1.5 flex-wrap">
                  {SUGGESTED_QUESTIONS.slice(0, 3).map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-xs px-2.5 py-1.5 rounded-full border border-white/10 text-[#A1A1AA] hover:bg-white/5 hover:text-[#FAFAFA] transition-all"
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
              className="flex items-center gap-2 px-4 py-3 border-t border-white/10"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about Lalit..."
                className="flex-1 bg-white/5 rounded-xl px-3.5 py-2.5 text-sm text-[#FAFAFA] placeholder-[#71717A] outline-none border border-white/5 focus:border-[#8B5CF6]/50 transition-colors"
                disabled={isTyping}
              />
              <motion.button
                type="submit"
                disabled={!input.trim() || isTyping}
                className={cn(
                  "flex items-center justify-center w-9 h-9 rounded-xl transition-all",
                  input.trim() && !isTyping
                    ? "bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white"
                    : "bg-white/5 text-[#71717A]"
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
