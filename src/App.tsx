import React from 'react';
import MainLayout from './components/layout/MainLayout';
import Hero from './components/sections/Hero';
import TechStrip from './components/sections/TechStrip';
import WorkSection from './components/sections/WorkSection';
import ServicesSection from './components/sections/ServicesSection';
import AboutSkills from './components/sections/AboutSkills';
import ProcessSection from './components/sections/ProcessSection';
import ProofSection from './components/sections/ProofSection';
import Resume from './components/sections/Resume';
import Contact from './components/sections/Contact';
import SEO from './components/common/SEO';

/**
 * Production merge: Hero / Navbar / Footer from deployed main;
 * content sections + typography from local polish pass.
 */
const App: React.FC = () => {
    return (
        <MainLayout>
            <SEO />
            <header>
                <Hero />
            </header>

            <TechStrip />

            <div className="mx-auto max-w-7xl space-y-[5rem] px-4 pb-[max(3.25rem,env(safe-area-inset-bottom))] pt-[4.75rem] sm:space-y-[5.5rem] sm:px-6 sm:pb-[max(3.5rem,env(safe-area-inset-bottom))] sm:pt-[5rem] md:space-y-36 md:pb-[max(4.25rem,env(safe-area-inset-bottom))] md:pt-[6rem] lg:space-y-[10rem] lg:px-12 lg:pb-[max(4.25rem,env(safe-area-inset-bottom))]">
                <section id="work" className="scroll-mt-28">
                    <WorkSection />
                </section>

                <ServicesSection />

                <AboutSkills />

                <ProcessSection />

                <ProofSection />

                <Resume />

                <Contact />
            </div>
        </MainLayout>
    );
};

export default App;
