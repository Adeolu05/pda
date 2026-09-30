import { useEffect, useState } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

export const useMousePosition = () => {
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);
    const [visible, setVisible] = useState(false);

    // Trailing ring uses the spring; the dot uses the raw position so it never lags the pointer
    const cursorX = useSpring(mouseX, { damping: 20, stiffness: 200 });
    const cursorY = useSpring(mouseY, { damping: 20, stiffness: 200 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            setVisible(true);
        };
        const handleLeave = () => setVisible(false);

        window.addEventListener('mousemove', handleMouseMove);
        document.documentElement.addEventListener('mouseleave', handleLeave);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.documentElement.removeEventListener('mouseleave', handleLeave);
        };
    }, [mouseX, mouseY]);

    return { cursorX, cursorY, dotX: mouseX, dotY: mouseY, visible };
};
