"use client"

import * as React from "react"
import type { ThemeProviderProps } from 'next-themes/dist/types'
import { ThemeProvider as NextThemesProvider } from 'next-themes';

interface Props extends ThemeProviderProps {
    children: React.ReactNode
}

export function ThemeProvider({ children, ...props }: Props) {
  return (
       <NextThemesProvider {...props}>{children}</NextThemesProvider>
  );
}
