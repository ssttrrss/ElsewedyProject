"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type ViewMode = "user" | "admin"

interface ViewContextType {
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
  isAdmin: boolean
}

const ViewContext = createContext<ViewContextType | undefined>(undefined)

export function ViewProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewMode] = useState<ViewMode>("user")

  useEffect(() => {
    // Load saved view mode from localStorage
    const savedMode = localStorage.getItem("viewMode") as ViewMode
    if (savedMode && (savedMode === "user" || savedMode === "admin")) {
      setViewMode(savedMode)
    }
  }, [])

  const handleSetViewMode = (mode: ViewMode) => {
    setViewMode(mode)
    localStorage.setItem("viewMode", mode)
  }

  const isAdmin = viewMode === "admin"

  return (
    <ViewContext.Provider
      value={{
        viewMode,
        setViewMode: handleSetViewMode,
        isAdmin,
      }}
    >
      {children}
    </ViewContext.Provider>
  )
}

export function useView() {
  const context = useContext(ViewContext)
  if (context === undefined) {
    throw new Error("useView must be used within a ViewProvider")
  }
  return context
}
