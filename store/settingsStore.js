import { create } from 'zustand'
import { getSettings } from '@/services/api'

const fetchSettingsAction = async (set) => {
  try {
    const response = await getSettings()
    set({ settings: response.data.settings })
  } catch (error) {
    console.error('Error fetching settings:', error)
  }
}

export const useSettingsStore = create((set) => ({
  settings: null,
  fetchSettings: () => fetchSettingsAction(set),
}))