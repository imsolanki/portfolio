"use client";

import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { AIProjects } from "@/components/sections/ai-projects";
import { BackendExpertise } from "@/components/sections/backend-expertise";
import { SystemDesign } from "@/components/sections/system-design";
import { OpenSource } from "@/components/sections/open-source";
import { BlogPreview } from "@/components/sections/blog-preview";
import { Testimonials } from "@/components/sections/testimonials";
import { TechStack } from "@/components/sections/tech-stack";
import { Statistics } from "@/components/sections/statistics";
import { Contact } from "@/components/sections/contact";

// Dynamically import 3D scene to avoid SSR issues
const SceneContainer = dynamic(
  () =>
    import("@/components/three/scene-container").then(
      (mod) => mod.SceneContainer
    ),
  {
    ssr: false,
    loading: () => null,
  }
);

// Dynamically import floating code effect
const FloatingCode = dynamic(
  () =>
    import("@/components/effects/floating-code").then(
      (mod) => mod.FloatingCode
    ),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function Home() {
  return (
    <>
      {/* 3D Particle Network Background */}
      <SceneContainer />

      {/* Floating Code Snippets */}
      <FloatingCode />

      {/* Main Content */}
      <div className="relative z-10">
        <Hero />

        <div className="relative">
          <About />
          <Projects />
          <Experience />
          <AIProjects />
          <BackendExpertise />
          <SystemDesign />
          <TechStack />
          <Statistics />
          <Testimonials />
          <OpenSource />
          <BlogPreview />
          <Contact />
        </div>
      </div>
    </>
  );
}
