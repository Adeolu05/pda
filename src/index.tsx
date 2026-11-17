import React from 'react';
import ReactDOM from 'react-dom/client';
import { inject } from '@vercel/analytics';
import './index.css';
import Root from './Root';

const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error('Could not find root element to mount to');
}

const app = (
    <React.StrictMode>
        <Root />
    </React.StrictMode>
);

// The build pre-renders the page into #root (scripts/prerender.mjs), so attach to that markup.
// The dev server serves an empty #root, so render from scratch there.
if (rootElement.hasChildNodes()) {
    ReactDOM.hydrateRoot(rootElement, app);
} else {
    ReactDOM.createRoot(rootElement).render(app);
}

// Vercel Web Analytics: cookie-free page views, loaded from this site's own origin (/_vercel/insights).
inject();
