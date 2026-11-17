import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex min-h-screen flex-col bg-bg">
        <Navbar />
        <main id="main" className="flex-grow">
            {children}
        </main>
        <Footer />
    </div>
);

export default MainLayout;
