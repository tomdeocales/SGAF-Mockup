"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

interface User {
  name: string
  email: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("sgaf_user")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User
        setUser(parsedUser)
      } catch (error) {
        console.error("Failed to parse stored user", error)
        localStorage.removeItem("sgaf_user")
      }
    }
    setIsLoading(false)
  }, [])

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !user && pathname !== "/login") {
      router.push("/login")
    }
  }, [user, isLoading, pathname, router])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    if (email && password) {
      const userData: User = {
        name: email
          .split("@")[0]
          .replace(/[._]/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase()),
        email: email,
        avatar: "/professional-man.jpg",
      }
      setUser(userData)
      localStorage.setItem("sgaf_user", JSON.stringify(userData))
      return { success: true }
    }

    return { success: false, error: "Please enter both email and password" }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("sgaf_user")
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, isLoading, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
