import React from 'react';
import { renderToString } from 'react-dom/server';
import Root from './Root';
import NotFound from './components/NotFound';

/** Used only at build time by scripts/prerender.mjs. */
export const renderApp = () => renderToString(<Root />);
export const renderNotFound = () => renderToString(<NotFound />);
