"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import axiosClient from "./axios-client"
import { toast } from "sonner"
import { useLoading } from "@/components/loading-provider"

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

export function useApiHooks() {
  const { setIsLoading } = useLoading()
  const queryClient = useQueryClient()

  // Get all cargos
  const useCargos = (filters?: Record<string, any>) => {
    return useQuery({
      queryKey: ["cargos", filters],
      queryFn: async () => {
        setIsLoading(true)
        try {
          let url = "/cargos/"
          if (filters && Object.keys(filters).length > 0) {
            const params = new URLSearchParams()
            Object.entries(filters).forEach(([key, value]) => {
              if (value !== undefined && value !== null && value !== "") {
                params.append(key, String(value))
              }
            })
            url += `?${params.toString()}`
          }
          const response = await axiosClient.get(url)
          return response.data
        } catch (error) {
          console.error("Error fetching cargos:", error)
          toast.error("Yuklar ro'yxatini olishda xatolik yuz berdi")
          return []
        } finally {
          setIsLoading(false)
        }
      },
    })
  }

  // Get cargo by ID
  const useCargoById = (id: number) => {
    return useQuery({
      queryKey: ["cargo", id],
      queryFn: async () => {
        setIsLoading(true)
        try {
          const response = await axiosClient.get(`/cargos/${id}`)
          return response.data
        } catch (error) {
          console.error(`Error fetching cargo ${id}:`, error)
          toast.error("Yuk ma'lumotlarini olishda xatolik yuz berdi")
          return null
        } finally {
          setIsLoading(false)
        }
      },
      enabled: !!id,
    })
  }

  // Get user cargos
  const useUserCargos = () => {
    return useQuery({
      queryKey: ["userCargos"],
      queryFn: async () => {
        setIsLoading(true)
        try {
          const response = await axiosClient.get("/profile/cargos")
          return response.data
        } catch (error) {
          console.error("Error fetching user cargos:", error)
          toast.error("Foydalanuvchi yuklarini olishda xatolik yuz berdi")
          return []
        } finally {
          setIsLoading(false)
        }
      },
    })
  }

  // Create cargo mutation
  const useCreateCargo = () => {
    return useMutation({
      mutationFn: async (data: CargoFormData) => {
        setIsLoading(true)
        try {
          const response = await axiosClient.post("/cargos/", data)
          return response.data
        } finally {
          setIsLoading(false)
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cargos"] })
        queryClient.invalidateQueries({ queryKey: ["userCargos"] })
        toast.success("Yuk muvaffaqiyatli qo'shildi")
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "Yukni qo'shishda xatolik yuz berdi")
      },
    })
  }

  // Update cargo mutation
  const useUpdateCargo = (id: number) => {
    return useMutation({
      mutationFn: async (data: Partial<CargoFormData>) => {
        setIsLoading(true)
        try {
          const response = await axiosClient.put(`/cargos/${id}/`, data)
          return response.data
        } finally {
          setIsLoading(false)
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cargos"] })
        queryClient.invalidateQueries({ queryKey: ["cargo", id] })
        queryClient.invalidateQueries({ queryKey: ["userCargos"] })
        toast.success("Yuk muvaffaqiyatli yangilandi")
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "Yukni yangilashda xatolik yuz berdi")
      },
    })
  }

  // Add comment mutation
  const useAddComment = () => {
    return useMutation({
      mutationFn: async ({
        cargoId,
        comment,
      }: {
        cargoId: number
        comment: string
      }) => {
        setIsLoading(true)
        try {
          const response = await axiosClient.put(`/cargos/${cargoId}`, {
            comment,
          })
          return response.data
        } finally {
          setIsLoading(false)
        }
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ["cargo", variables.cargoId] })
        toast.success("Izoh muvaffaqiyatli qo'shildi")
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "Izoh qo'shishda xatolik yuz berdi")
      },
    })
  }

  return {
    useCargos,
    useCargoById,
    useUserCargos,
    useCreateCargo,
    useUpdateCargo,
    useAddComment,
  }
}

