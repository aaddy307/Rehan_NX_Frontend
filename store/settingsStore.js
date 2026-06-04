import { create } from 'zustand'
import { getSettings } from '@/services/api'

export const useSettingsStore = create((set) => ({
  settings: null,

  fetchSettings: async () => {
    try {
      const response = await getSettings()
      set({ settings: response.data.settings })
    } catch (error) {
      console.error('Error fetching settings:', error)
    }
  },
}))