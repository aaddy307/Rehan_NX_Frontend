'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getProducts, deleteProduct, getCategories, getBrands } from '@/services/api'
import DataTable from '@/components/admin/DataTable'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import LoadingSkeleton from '@/components/shared/LoadingSkeleton'
import { Button } from '@/components/ui/Button'
import { Plus, Search } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { toast } from 'sonner'
import { formatPrice } from '@/utils/formatPrice'

export default function ProductsPage() {
  const router = useRouter()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [deleteId, setDeleteId] = useState(null)
  
  // Filter states
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')

  const debounceRef = useRef(null)

  useEffect(() => {
    // Initial fetch of filters and products
    const loadFilters = async () => {
      try {
        const [catRes, brandRes] = await Promise.all([
          getCategories({ all: true }),
          getBrands({ all: true })
        ])
        setCategories(catRes.data.categories || [])
        setBrands(brandRes.data.brands || [])
      } catch (err) {
        console.error('Failed to load filter lists:', err)
      }
    }
    
    loadFilters()
    fetchProducts('', '', '', '')
  }, [])

  const fetchProducts = async (searchParams = search, category = selectedCategory, brand = selectedBrand, status = selectedStatus) => {
    try {
      setLoading(true)
      const queryParams = { limit: 100, search: searchParams, all: true }
      if (category) queryParams.category = category
      if (brand) queryParams.brand = brand
      if (status) queryParams.status = status

      const response = await getProducts(queryParams)
      setProducts(response.data.products || [])
    } catch (error) {
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    const value = e.target.value
    setSearch(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      fetchProducts(value, selectedCategory, selectedBrand, selectedStatus)
    }, 300)
  }

  const handleCategoryChange = (e) => {
    const val = e.target.value
    setSelectedCategory(val)
    fetchProducts(search, val, selectedBrand, selectedStatus)
  }

  const handleBrandChange = (e) => {
    const val = e.target.value
    setSelectedBrand(val)
    fetchProducts(search, selectedCategory, val, selectedStatus)
  }

  const handleStatusChange = (e) => {
    const val = e.target.value
    setSelectedStatus(val)
    fetchProducts(search, selectedCategory, selectedBrand, val)
  }

  const handleDelete = async () => {
    try {
      await deleteProduct(deleteId)
      toast.success('Product deleted')
      setProducts(products.filter((p) => p._id !== deleteId))
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete')
    }
    setDeleteId(null)
  }

  const columns = [
    { key: 'images', label: 'Image', render: (val) => val?.[0]?.url ? <Image src={val[0].url} alt="" width={50} height={50} className="w-12 h-12 object-cover rounded" /> : <div className="w-12 h-12 bg-gray-200 rounded" /> },
    { key: 'name', label: 'Name' },
    { key: 'category', label: 'Category', render: (val) => typeof val === 'object' ? val?.name : 'N/A' },
    { key: 'brand', label: 'Brand', render: (val) => typeof val === 'object' ? val?.name : val || 'N/A' },
    { key: 'price', label: 'Price', render: (val) => formatPrice(val) },
    { key: 'status', label: 'Status', render: (val) => <span className={`px-2 py-1 rounded text-xs ${val ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{val ? 'Active' : 'Inactive'}</span> },
  ]

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-primary">Products</h1>
        <Link href="/admin/products/create">
          <Button><Plus className="w-4 h-4 mr-2" /> Create Product</Button>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="relative w-full lg:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Search products..." value={search} onChange={handleSearch} className="pl-10 w-full" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto">
          <div>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full lg:w-44 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors cursor-pointer"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c._id} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={selectedBrand}
              onChange={handleBrandChange}
              className="w-full lg:w-44 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors cursor-pointer"
            >
              <option value="">All Brands</option>
              {brands.map((b) => (
                <option key={b._id} value={b.slug}>{b.name}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={selectedStatus}
              onChange={handleStatusChange}
              className="w-full lg:w-36 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors cursor-pointer"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <LoadingSkeleton type="table" rows={5} />
        ) : (
          <DataTable columns={columns} data={products} onEdit={(row) => router.push(`/admin/products/edit/${row._id}`)} onDelete={(row) => setDeleteId(row._id)} />
        )}
      </div>

      <ConfirmDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Product" description="Are you sure you want to delete this product? This action cannot be undone." />
    </div>
  )
}
