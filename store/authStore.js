import { create } from 'zustand'
import { login as loginApi, logout as logoutApi, getMe } from '@/services/api'

export const useAuthStore = create((set) => ({
  admin: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (credentials) => {
    try {
      const response = await loginApi(credentials)
      set({ admin: response.data.admin, isAuthenticated: true })
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      }
    }
  },

  logout: async () => {
    try {
      await logoutApi()
    } catch (error) {
      console.error('Logout error:', error)
    }
    set({ admin: null, isAuthenticated: false })
  },

  checkAuth: async () => {
    try {
      const response = await getMe()
      set({ admin: response.data.admin, isAuthenticated: true, isLoading: false })
      return true
    } catch (error) {
      set({ admin: null, isAuthenticated: false, isLoading: false })
      return false
    }
  },
}))
