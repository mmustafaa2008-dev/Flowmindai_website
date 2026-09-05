import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { LiveDemo } from "@/components/sections/LiveDemo";
import { Pricing } from "@/components/sections/Pricing";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { WhyFlowMind } from "@/components/sections/WhyFlowMind";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

/**
 * Homepage.
 *
 * Phase 8 scope: About + Final CTA + Contact (UI only, no server
 * integration yet) + Footer appended after Pricing. The next phase will
 * wire the contact form to a real `/api/contact` route + Resend without
 * needing to change this composition.
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
        <LiveDemo />
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
