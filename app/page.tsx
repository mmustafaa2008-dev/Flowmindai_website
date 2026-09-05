import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { WhyFlowMind } from "@/components/sections/WhyFlowMind";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

/**
 * Homepage.
 *
 * Section order: Hero, Services, WhyFlowMind, HowItWorks, Projects,
 * Pricing, About, FinalCTA, Contact.
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Services />
        <WhyFlowMind />
        <HowItWorks />
        <Projects />
        <Pricing />
        <About />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
