import { LandingNav } from "@/components/landing/landing-nav";
import { LandingHero } from "@/components/landing/hero";
import {
  BomWorkflow,
  ComparePaths,
  EnterprisePreview,
  HowItWorks,
  TechnicalMatching,
  WhyTeams,
  ZephyrTransparency,
} from "@/components/landing/sections";
import { TechMarquee } from "@/components/landing/motion/tech-marquee";
import { GsapParallaxStrip, GsapPipelineVisual } from "@/components/landing/gsap-motion/scroll-reveal";
import { GsapStatsRow } from "@/components/landing/gsap-motion/stats-row";

export default function HomePage() {
  return (
    <>
      <LandingNav />
      <LandingHero />
      <TechMarquee />
      <GsapStatsRow />
      <HowItWorks />
      <GsapPipelineVisual />
      <WhyTeams />
      <ComparePaths />
      <GsapParallaxStrip />
      <BomWorkflow />
      <TechnicalMatching />
      <ZephyrTransparency />
      <EnterprisePreview />
    </>
  );
}
