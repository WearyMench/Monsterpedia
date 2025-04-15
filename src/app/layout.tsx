'use client';

import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import React from "react";
import {ThemeProvider as NextThemesProvider} from 'next-themes';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

import { ThemeProvider } from "@/components/ui/theme-provider";
import { Session } from "next-auth";
import { metadata } from './metadata';

// export const metadata: Metadata = {
//   title: 'Monsterpedia',
//   description: 'A monster encyclopedia app',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          {children}
        </ClientThemeProvider>
      </body>
    </html>
  );
}

// Creating a separate client component for ThemeProvider

interface ThemeProviderProps {
    children: React.ReactNode;
    session: Session | null
}

function ClientThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </NextThemesProvider>
    );
}

