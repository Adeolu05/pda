import React from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '../../hooks/useMousePosition';

const CustomCursor: React.FC = () => {
    const { cursorX, cursorY } = useMousePosition();

    return (
        <>
            <motion.div
                style={{ x: cursorX, y: cursorY }}
                className="fixed top-0 left-0 w-8 h-8 border border-violet-600 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block -translate-x-1/2 -translate-y-1/2"
            />
            <motion.div
                style={{ x: cursorX, y: cursorY }}
                className="fixed top-0 left-0 w-1.5 h-1.5 bg-violet-600 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
            />
        </>
    );
};

export default CustomCursor;
