import React from 'react';
import { Analytics } from "@vercel/analytics/react";
import MainLayout from './components/layout/MainLayout';
import Hero from './components/sections/Hero';
import WorkSection from './components/sections/WorkSection';
import AboutSkills from './components/sections/AboutSkills';
import Contact from './components/sections/Contact';
import Resume from './components/sections/Resume';
import SEO from './components/common/SEO';

const App: React.FC = () => {
  return (
    <MainLayout>
      <SEO />
      <header>
        <Hero />
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 md:py-20 space-y-12 md:space-y-20">
        <section id="work" className="scroll-mt-24">
          <WorkSection />
        </section>

        <section id="about" className="scroll-mt-24">
          <AboutSkills />
        </section>

        <section id="contact" className="scroll-mt-24">
          <Contact />
        </section>

        <section id="resume" className="scroll-mt-24">
          <Resume />
        </section>
      </div>
      <Analytics />
    </MainLayout>
  );
};

export default App;