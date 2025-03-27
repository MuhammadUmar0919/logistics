"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { toast } from "sonner"
import { useLoading } from "@/components/loading-provider"
import axiosClient from "./axios-client"

export type User = {
  id: number
  name: string
  phone_number: string
  email: string
  vehicle_type?: string
  license_type?: string
  vehicle_capacity?: number
  experience?: number
}

type AuthContextType = {
  user: User | null
  token: string | null
  login: (phone_number: string, password: string) => Promise<void>
  register: (name: string, phone_number: string, email: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const { setIsLoading } = useLoading()

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
      setToken(storedToken)
      fetchUserProfile(storedToken)
    }
  }, [])

  useEffect(() => {
    // Redirect to login if not authenticated and trying to access protected routes
    const protectedRoutes = ["/profile", "/add-cargo"]
    const authRoutes = ["/login", "/register"]

    if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
      router.push("/login")
    }

    if (token && authRoutes.some((route) => pathname === route)) {
      router.push("/profile")
    }
  }, [token, pathname, router])

  const fetchUserProfile = async (authToken: string) => {
    try {
      setIsLoading(true)
      const response = await axiosClient.get("/profile", {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })

      if (response.status === 200) {
        setUser(response.data)
      } else {
        // Token is invalid or expired
        localStorage.removeItem("token")
        setToken(null)
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error)
      localStorage.removeItem("token")
      setToken(null)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (phone_number: string, password: string) => {
    try {
      setIsLoading(true)
      const response = await axiosClient.post("/login", {
        phone_number,
        password,
      })

      const data = response.data

      if (response.status === 200 && data.token) {
        localStorage.setItem("token", data.token)
        setToken(data.token)
        await fetchUserProfile(data.token)
        toast.success("Muvaffaqiyatli kirish")
        router.push("/profile")
      }
    } catch (error: any) {
      console.error("Login error:", error)
      toast.error(error.response?.data?.message || "Login yoki parol noto'g'ri")
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, phone_number: string, email: string, password: string) => {
    try {
      setIsLoading(true)
      const response = await axiosClient.post("/register/", {
        name,
        phone_number,
        email,
        password,
      })

      const data = response.data

      if (response.status === 201 && data.token) {
        localStorage.setItem("token", data.token)
        setToken(data.token)
        await fetchUserProfile(data.token)
        toast.success("Muvaffaqiyatli ro'yxatdan o'tish")
        router.push("/profile")
      }
    } catch (error: any) {
      console.error("Registration error:", error)
      toast.error(error.response?.data?.message || "Ro'yxatdan o'tishda xatolik yuz berdi")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
    router.push("/")
    toast.success("Siz tizimdan chiqdingiz")
  }

  const updateProfile = async (data: Partial<User>) => {
    if (!token) return

    try {
      setIsLoading(true)
      const response = await axiosClient.put("/profile/", data)

      if (response.status === 200) {
        const updatedUser = response.data
        setUser((prev) => ({ ...prev!, ...updatedUser }))
        toast.success("Profil ma'lumotlari yangilandi")
      }
    } catch (error: any) {
      console.error("Profile update error:", error)
      toast.error(error.response?.data?.message || "Profil ma'lumotlarini yangilashda xatolik yuz berdi")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

