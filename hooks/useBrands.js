import { useState, useEffect } from 'react'
import { getBrands } from '@/services/api'

export const useBrands = () => {
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await getBrands({ status: true })
        setBrands(response.data.brands)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchBrands()
  }, [])

  return { brands, loading, error }
}