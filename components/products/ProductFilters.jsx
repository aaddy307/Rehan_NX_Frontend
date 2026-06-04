'use client'

import { useFilterStore } from '@/store/filterStore'
import { useCategories } from '@/hooks/useCategories'
import { useBrands } from '@/hooks/useBrands'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'

export default function ProductFilters({ onFilterChange }) {
  const { search, category, brand, sort, resetFilters } = useFilterStore()
  const { categories } = useCategories()
  const { brands } = useBrands()

  const handleSearch = (e) => {
    useFilterStore.getState().setFilter('search', e.target.value)
  }

  const handleCategoryChange = (e) => {
    useFilterStore.getState().setFilter('category', e.target.value)
  }

  const handleBrandChange = (e) => {
    useFilterStore.getState().setFilter('brand', e.target.value)
  }

  const handleSortChange = (e) => {
    useFilterStore.getState().setFilter('sort', e.target.value)
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input placeholder="Search products..." value={search} onChange={handleSearch} className="pl-10" />
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

      {(search || category || brand) && (
        <button onClick={resetFilters} className="flex items-center gap-2 text-accent hover:underline text-sm">
          <X className="w-4 h-4" />
          Clear Filters
        </button>
      )}
    </div>
  )
}