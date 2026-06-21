import { useState, useEffect, useMemo } from 'react'
import { getProducts } from '@/services/api'

export const useProducts = (params = {}) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState(null)
  const [error, setError] = useState(null)

  const stableParams = useMemo(() => params, [JSON.stringify(params)])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await getProducts(stableParams)
        setProducts(response.data.products)
        setPagination(response.data.pagination)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [stableParams])

  return { products, loading, pagination, error }
}