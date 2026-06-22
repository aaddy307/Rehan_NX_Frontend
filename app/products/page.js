'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ProductGrid from '@/components/products/ProductGrid'
import ProductFilters from '@/components/products/ProductFilters'
import LoadingSkeleton from '@/components/shared/LoadingSkeleton'
import { useSettingsStore } from '@/store/settingsStore'
import { getProducts } from '@/services/api'
import { Filter, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'

function ProductsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [error, setError] = useState(null)

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page)
    router.push(`/products?${params.toString()}`)
  }
  const { fetchSettings } = useSettingsStore()

  useEffect(() => {
    fetchSettings()
  }, [fetchSettings])

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      const params = {}
      if (searchParams.get('category')) params.category = searchParams.get('category')
      if (searchParams.get('brand')) params.brand = searchParams.get('brand')
      if (searchParams.get('featured')) params.featured = searchParams.get('featured')
      if (searchParams.get('search')) params.search = searchParams.get('search')
      if (searchParams.get('page')) params.page = searchParams.get('page')
      if (searchParams.get('sort')) params.sort = searchParams.get('sort')

      try {
        const response = await getProducts(params)
        setProducts(response.data.products)
        setPagination(response.data.pagination)
        setError(null)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [searchParams.toString()])

  return (
    <>
      <div className="lg:hidden mb-4">
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="w-full justify-center">
          <Filter className="w-4 h-4 mr-2" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className={`lg:w-60 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white rounded-xl p-4 shadow-sm sticky top-24">
            <div className="flex items-center justify-between mb-4 lg:hidden">
              <h3 className="font-semibold">Filters</h3>
              <button onClick={() => setShowFilters(false)}><X className="w-5 h-5" /></button>
            </div>
            <ProductFilters />
          </div>
        </aside>

        <div className="flex-1">
          {loading ? (
            <LoadingSkeleton type="card" rows={8} />
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              Failed to load products. Please try again later.
            </div>
          ) : (
            <ProductGrid products={products} loading={false} emptyMessage="No products found matching your criteria" />
          )}

          {pagination && pagination.pages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-lg ${page === pagination.page ? 'bg-accent text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">Our Products</h1>
          <p className="text-gray-500 mb-8">Browse our collection of latest smartphones</p>
          <Suspense fallback={<LoadingSkeleton type="card" rows={8} />}>
            <ProductsContent />
          </Suspense>
        </div>
      </div>
      <Footer />
    </main>
  )
}