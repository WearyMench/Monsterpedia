"use client"

import * as React from "react"
import type { ThemeProviderProps } from 'next-themes/dist/types'

interface Props extends ThemeProviderProps {
    children: React.ReactNode
}

export function ThemeProvider({ children, ...props }: Props) {
  return (null);
}

