'use client'

import * as React from 'react'
import dynamic from 'next/dynamic'

import { type ThemeProviderProps } from 'next-themes/dist/types'
import { ThemeProvider as StaticProvider } from 'next-themes'
const DynamicProvider = dynamic(
  () => import('next-themes').then((e) => e.ThemeProvider),
  {
    ssr: false,
  }
)

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const NextThemeProvider =
    process.env.NODE_ENV === 'production' ? StaticProvider : DynamicProvider
  return <NextThemeProvider {...props}>{children}</NextThemeProvider>
}
