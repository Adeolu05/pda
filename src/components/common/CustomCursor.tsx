import React from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '../../hooks/useMousePosition';

const CustomCursor: React.FC = () => {
    const { cursorX, cursorY, dotX, dotY, visible } = useMousePosition();

    return (
        <div aria-hidden className={`transition-opacity duration-200 ${visible ? 'opacity-100' : 'opacity-0'}`}>
            <motion.div
                style={{ x: cursorX, y: cursorY }}
                className="fixed top-0 left-0 w-8 h-8 border border-violet-600 rounded-full pointer-events-none z-[10000] mix-blend-difference hidden md:block -ml-4 -mt-4"
            />
            <motion.div
                style={{ x: dotX, y: dotY }}
                className="fixed top-0 left-0 w-1.5 h-1.5 bg-violet-600 rounded-full pointer-events-none z-[10000] -ml-[3px] -mt-[3px] hidden md:block"
            />
        </div>
    );
};

export default CustomCursor;
