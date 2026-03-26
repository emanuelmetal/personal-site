'use client';
import React from 'react';
import { script as themeScript } from '../scripts/setInitalTheme';

export const ThemeScript = React.memo(function getTheme({
  currentTheme,
}: {
  currentTheme: string;
}) {
  const scriptArgs = JSON.stringify([currentTheme]).slice(1, -1);

  return (
    <script
      async
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: `(${themeScript.toString()})(${scriptArgs})`,
      }}
    />
  );
});
