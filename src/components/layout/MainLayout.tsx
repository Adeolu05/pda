import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CustomCursor from '../common/CustomCursor';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen selection:bg-violet-600 selection:text-white bg-bg-base flex flex-col relative">
            <CustomCursor />
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
