import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CustomCursor from '../common/CustomCursor';
import { PROFILE_IMAGE } from '../../config/constants';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    useEffect(() => {
        // Dynamically create a circular favicon from the profile image
        const setCircularFavicon = () => {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = 64;
                canvas.height = 64;
                const ctx = canvas.getContext('2d');
                if (!ctx) return;

                const img = new Image();
                img.crossOrigin = 'Anonymous';
                img.src = PROFILE_IMAGE;

                img.onload = () => {
                    // Create circular clip
                    ctx.beginPath();
                    ctx.arc(32, 32, 32, 0, 2 * Math.PI);
                    ctx.closePath();
                    ctx.clip();

                    // Calculate center crop to maintain aspect ratio
                    const aspectRatio = img.width / img.height;
                    let sourceWidth, sourceHeight, sourceX, sourceY;

                    if (aspectRatio > 1) {
                        sourceHeight = img.height;
                        sourceWidth = img.height;
                        sourceX = (img.width - img.height) / 2;
                        sourceY = 0;
                    } else {
                        sourceWidth = img.width;
                        sourceHeight = img.width;
                        sourceX = 0;
                        sourceY = (img.height - img.width) / 2;
                    }

                    ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, 64, 64);

                    let link = document.querySelector("link[rel='icon']") as HTMLLinkElement;
                    if (!link) {
                        link = document.createElement('link');
                        link.rel = 'icon';
                        document.head.appendChild(link);
                    }
                    link.type = 'image/png';
                    link.href = canvas.toDataURL("image/png");
                };
            } catch (e) {
                console.error("Failed to generate circular favicon", e);
            }
        };

        setCircularFavicon();
    }, []);

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
