import { useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

export const useMousePosition = () => {
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const cursorX = useSpring(mouseX, { damping: 20, stiffness: 200 });
    const cursorY = useSpring(mouseY, { damping: 20, stiffness: 200 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [mouseX, mouseY]);

    return { cursorX, cursorY };
};
