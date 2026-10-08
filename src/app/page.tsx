import { Experience } from "@/components/portfolio/fx/experience";
import { Nav } from "@/components/portfolio/nav";
import { Hero } from "@/components/portfolio/hero";
import { Snapshot } from "@/components/portfolio/snapshot";
import { Manifesto } from "@/components/portfolio/manifesto";
import { FeaturedProject } from "@/components/portfolio/featured-project";
import { Projects } from "@/components/portfolio/projects";
import { Attachment } from "@/components/portfolio/attachment";
import { TextileCapabilities, IndustrialCapabilities } from "@/components/portfolio/capabilities";
import { QualitySection } from "@/components/portfolio/quality";
import { SkillsTools } from "@/components/portfolio/skills-tools";
import { Education } from "@/components/portfolio/education";
import { Timeline } from "@/components/portfolio/timeline";
import { Philosophy, Contact } from "@/components/portfolio/closing";

export default function PortfolioPage() {
  return (
    <Experience>
      <div className="relative min-h-screen overflow-x-clip bg-background">
        <a
          href="#profile"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-green focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <div className="noise" aria-hidden />
        <Nav />
        <main>
          <Hero />
          <Snapshot />
          <Manifesto />
          <FeaturedProject />
          <Projects />
          <Attachment />
          <TextileCapabilities />
          <IndustrialCapabilities />
          <QualitySection />
          <SkillsTools />
          <Education />
          <Timeline />
          <Philosophy />
          <Contact />
        </main>
      </div>
    </Experience>
  );
}
