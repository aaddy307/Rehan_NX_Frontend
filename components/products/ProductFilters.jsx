'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCategories } from '@/hooks/useCategories'
import { useBrands } from '@/hooks/useBrands'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'

export default function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { categories, error: categoriesError } = useCategories()
  const { brands, error: brandsError } = useBrands()

  const error = categoriesError || brandsError

  const search = searchParams.get('search') || ''
  const category = searchParams.get('category') || ''
  const brand = searchParams.get('brand') || ''
  const sort = searchParams.get('sort') || 'newest'

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete('page') // Reset to page 1 when filtering
    router.push(`/products?${params.toString()}`)
  }

  const handleSearch = (e) => {
    updateFilter('search', e.target.value)
  }

  const handleCategoryChange = (e) => {
    updateFilter('category', e.target.value)
  }

  const handleBrandChange = (e) => {
    updateFilter('brand', e.target.value)
  }

  const handleSortChange = (e) => {
    updateFilter('sort', e.target.value)
  }

  const clearFilters = () => {
    router.push('/products')
  }

  const hasFilters = search || category || brand

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        Failed to load filters. Please try again later.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input 
          placeholder="Search products..." 
          value={search} 
          onChange={handleSearch}
          className="pl-10" 
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <Select value={category} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.slug}>{cat.name}</option>
          ))}
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
        <Select value={brand} onChange={handleBrandChange}>
          <option value="">All Brands</option>
          {brands.map((b) => (
            <option key={b._id} value={b.name}>{b.name}</option>
          ))}
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
        <Select value={sort} onChange={handleSortChange}>
          <option value="newest">Newest First</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
        </Select>
      </div>

      {hasFilters && (
        <Button variant="outline" onClick={clearFilters} className="w-full">
          <X className="w-4 h-4 mr-2" />
          Clear Filters
        </Button>
      )}
    </div>
  )
}