/**
 * Root component for Docusaurus site
 * Used to wrap the entire app and add Vercel analytics
 */
import React from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';

// Default implementation, that you can customize
export default function Root({ children }) {
  return (
    <>
      {children}
      <SpeedInsights />
      <Analytics />
    </>
  );
}