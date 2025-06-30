"use client"
import { ReactNode, createContext, useContext } from 'react'
import { create } from 'zustand'

type UIState = {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

export const useUIStore = create<UIState>(set => ({
  isSidebarOpen: false,
  toggleSidebar: () => set(s => ({ isSidebarOpen: !s.isSidebarOpen })),
}))

export const UIStoreContext = createContext< typeof useUIStore | null >(null)

export function UIStoreProvider({ children }: { children: ReactNode }) {
  return (
    <UIStoreContext.Provider value={useUIStore}>
      {children}
    </UIStoreContext.Provider>
  )
}

export function useGlobalUI<T>(selector: (state: UIState) => T): T {
  const store = useContext(UIStoreContext)
  if (!store) {
    throw new Error('Please wrap your app in <UIStoreProvider>')
  }
  return store(selector)
}