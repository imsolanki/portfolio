import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { Preloader } from "@/components/layout/preloader";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandPalette } from "@/components/ui/command-palette";
import { AIChatbot } from "@/components/ui/ai-chatbot";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lalit Kumar Singh — Senior Software Engineer | Enterprise Java, AI & Distributed Systems",
  description:
    "Senior Software Engineer specializing in enterprise Java backends, distributed systems, and AI-powered applications. Building production-grade systems at Goldman Sachs scale. Available for consulting at $150/hr.",
  keywords: [
    "Senior Software Engineer",
    "Java Developer",
    "Spring Boot",
    "Microservices",
    "AI Engineer",
    "GenAI",
    "Agentic AI",
    "System Design",
    "Distributed Systems",
    "Kafka",
    "AWS",
    "Docker",
    "Kubernetes",
    "Goldman Sachs",
    "Backend Developer",
    "Freelance Engineer",
    "Bengaluru",
  ],
  authors: [{ name: "Lalit Kumar Singh" }],
  creator: "Lalit Kumar Singh",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lalitkumarsingh.dev",
    title: "Lalit Kumar Singh — Senior Software Engineer",
    description:
      "Enterprise Java, Distributed Systems & AI Engineer. Building production-grade systems at Goldman Sachs scale.",
    siteName: "Lalit Kumar Singh Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lalit Kumar Singh — Senior Software Engineer",
    description:
      "Enterprise Java, Distributed Systems & AI Engineer. Building production-grade systems at Goldman Sachs scale.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#09090B" },
    { media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Lalit Kumar Singh",
              jobTitle: "Senior Software Engineer",
              description:
                "Senior Software Engineer specializing in enterprise Java backends, distributed systems, and AI-powered applications.",
              url: "https://lalitkumarsingh.dev",
              email: "shobhitsingh.e28@gmail.com",
              telephone: "+91-6306672872",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bengaluru",
                addressCountry: "IN",
              },
              sameAs: [
                "https://github.com/imsolanki",
                "https://www.linkedin.com/in/lalit-kumar-singh-aa447451/",
              ],
              knowsAbout: [
                "Java",
                "Spring Boot",
                "Microservices",
                "Distributed Systems",
                "AI",
                "GenAI",
                "System Design",
              ],
            }),
          }}
        />
      </head>
      <body className={`${fontVariables} font-sans antialiased`}>
        <ThemeProvider>
          <SmoothScroll>
            <Preloader />
            <ScrollProgress />
            <Navbar />
            <CommandPalette />
            <main>{children}</main>
            <Footer />
            <AIChatbot />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
