import React from 'react';
import MainLayout from './components/layout/MainLayout';
import Hero from './components/sections/Hero';
import Tools from './components/sections/Tools';
import Work from './components/sections/Work';
import Reviews from './components/sections/Reviews';
import Services from './components/sections/Services';
import About from './components/sections/About';
import Contact from './components/sections/Contact';

/**
 * Order follows what each visitor needs: who David is (Hero), proof for clients
 * (Work), proof for the crypto audience (Tools), what others say (Reviews), then how to hire.
 */
const App: React.FC = () => (
    <MainLayout>
        <Hero />
        <Work />
        <Tools />
        <Reviews />
        <Services />
        <About />
        <Contact />
    </MainLayout>
);

export default App;
