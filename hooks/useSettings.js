import { useState, useEffect } from 'react'
import { getSettings } from '@/services/api'

export const useSettings = () => {
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await getSettings()
        setSettings(response.data.settings)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  return { settings, loading, error }
}