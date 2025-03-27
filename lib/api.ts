"use client"

import { useAuth } from "./auth-provider"
import { useLoading } from "@/components/loading-provider"

const API_URL = "http://127.0.0.1:8000/api/v1"

export type Cargo = {
  id: number
  name: string
  weight: number
  origin: string
  destination: string
  vehicle_type: string
  price: number | null
  description: string | null
  status: string
  created_at: string
  customer?: {
    id: number
    name: string
    phone_number: string
    email: string
  }
  driver?: {
    id: number
    name: string
    phone_number: string
    email: string
  } | null
  reviews: Array<{
    id: number
    rating: number
    comment: string
    created_at: string
  }>
}

export type CargoFormData = {
  name: string
  weight: number
  origin: string
  destination: string
  vehicle_type: string
  price?: number
  description?: string
}

export function useApi() {
  const { token } = useAuth()
  const { setIsLoading } = useLoading()

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Token ${token}` } : {}),
  }

  const getCargos = async (filters?: Record<string, any>): Promise<Cargo[]> => {
    try {
      setIsLoading(true)
      let url = `${API_URL}/cargos/`

      if (filters && Object.keys(filters).length > 0) {
        const params = new URLSearchParams()
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            params.append(key, String(value))
          }
        })
        url += `?${params.toString()}`
      }

      const response = await fetch(url, { headers })

      if (!response.ok) {
        throw new Error("Failed to fetch cargos")
      }

      return await response.json()
    } catch (error) {
      console.error("Error fetching cargos:", error)
      return []
    } finally {
      setIsLoading(false)
    }
  }

  const getCargoById = async (id: number): Promise<Cargo | null> => {
    try {
      setIsLoading(true)
      const response = await fetch(`${API_URL}/cargos/${id}`, { headers })

      if (!response.ok) {
        throw new Error("Failed to fetch cargo")
      }

      return await response.json()
    } catch (error) {
      console.error(`Error fetching cargo ${id}:`, error)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const createCargo = async (data: CargoFormData): Promise<Cargo | null> => {
    try {
      setIsLoading(true)
      const response = await fetch(`${API_URL}/cargos/`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to create cargo")
      }

      return await response.json()
    } catch (error) {
      console.error("Error creating cargo:", error)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const updateCargo = async (id: number, data: Partial<CargoFormData>): Promise<Cargo | null> => {
    try {
      setIsLoading(true)
      const response = await fetch(`${API_URL}/cargos/${id}/`, {
        method: "PUT",
        headers,
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to update cargo")
      }

      return await response.json()
    } catch (error) {
      console.error(`Error updating cargo ${id}:`, error)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const addComment = async (cargoId: number, comment: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      const response = await fetch(`${API_URL}/cargos/${cargoId}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ comment }),
      })

      return response.ok
    } catch (error) {
      console.error(`Error adding comment to cargo ${cargoId}:`, error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const getUserCargos = async (): Promise<Cargo[]> => {
    try {
      setIsLoading(true)
      const response = await fetch(`${API_URL}/profile/cargos`, { headers })

      if (!response.ok) {
        throw new Error("Failed to fetch user cargos")
      }

      return await response.json()
    } catch (error) {
      console.error("Error fetching user cargos:", error)
      return []
    } finally {
      setIsLoading(false)
    }
  }

  return {
    getCargos,
    getCargoById,
    createCargo,
    updateCargo,
    addComment,
    getUserCargos,
  }
}

