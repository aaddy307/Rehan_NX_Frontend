import { useState, useEffect } from 'react'
import { getBanners } from '@/services/api'

export const useBanners = () => {
  const [banners, setBanners] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await getBanners()
        setBanners(response.data.banners)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchBanners()
  }, [])

  return { banners, loading, error }
}