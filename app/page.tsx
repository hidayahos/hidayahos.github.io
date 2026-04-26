"use client";

import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { SecuritySection } from "@/components/landing/security-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { MetricsSection } from "@/components/landing/metrics-section";
import { IntegrationsSection } from "@/components/landing/integrations-section";
import { DevelopersSection } from "@/components/landing/developers-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";
import { LazyLoadSection } from "@/components/lazy-load-section";
import dynamic from "next/dynamic";

// Dynamically import InfrastructureSection with no SSR for better performance
const InfrastructureSection = dynamic(
  () =>
    import("@/components/landing/infrastructure-section").then(
      (mod) => mod.InfrastructureSection
    ),
  {
    loading: () => <div className="min-h-screen" />,
    ssr: false,
  }
);

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Critical: Render immediately */}
      <Navigation />
      <HeroSection />

      {/* Lazy load below-the-fold sections */}
      <LazyLoadSection>
        <FeaturesSection />
      </LazyLoadSection>

      <LazyLoadSection>
        <PricingSection />
      </LazyLoadSection>

      <LazyLoadSection>
        <HowItWorksSection />
      </LazyLoadSection>

      <LazyLoadSection>
        <SecuritySection />
      </LazyLoadSection>

      <LazyLoadSection>
        <TestimonialsSection />
      </LazyLoadSection>

      <LazyLoadSection>
        <DevelopersSection />
      </LazyLoadSection>

      <LazyLoadSection>
        <IntegrationsSection />
      </LazyLoadSection>

      {/* Dynamically loaded with no SSR */}
      <LazyLoadSection>
        <InfrastructureSection />
      </LazyLoadSection>

      <LazyLoadSection>
        <MetricsSection />
      </LazyLoadSection>

      <LazyLoadSection>
        <CtaSection />
      </LazyLoadSection>

      <LazyLoadSection>
        <FooterSection />
      </LazyLoadSection>
    </main>
  );
}
