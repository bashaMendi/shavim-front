'use client'; 

import { ReactNode } from 'react'
import { UIStoreProvider } from '@/lib/zustand'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <UIStoreProvider>
      {children}
    </UIStoreProvider>
  )
}
