'use client'

import { ThemeProvider as MipoThemeProvider } from 'mipo-ui'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <MipoThemeProvider defaultTheme="glass" defaultMode="system">
      {children}
    </MipoThemeProvider>
  )
}