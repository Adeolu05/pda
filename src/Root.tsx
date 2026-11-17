import React from 'react';
import { MotionConfig } from 'framer-motion';
import App from './App';

/** Shared by the browser entry and the build-time pre-render, so both produce the same markup. */
const Root: React.FC = () => (
    // Honour the OS "reduce motion" setting for every framer-motion animation
    <MotionConfig reducedMotion="user">
        <App />
    </MotionConfig>
);

export default Root;
