'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getProducts, deleteProduct } from '@/services/api'
import DataTable from '@/components/admin/DataTable'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import LoadingSkeleton from '@/components/shared/LoadingSkeleton'
import { Button } from '@/components/ui/Button'
import { Plus, Search } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { toast } from 'sonner'
import { formatPrice } from '@/utils/formatPrice'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [deleteId, setDeleteId] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async (searchParams = '') => {
    try {
      setLoading(true)
      const response = await getProducts({ limit: 100, search: searchParams, all: true })
      setProducts(response.data.products)
    } catch (error) {
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
    fetchProducts(e.target.value)
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
    { key: 'image', label: 'Image', render: (val) => val?.[0] ? <Image src={val[0].url} alt="" width={50} height={50} className="w-12 h-12 object-cover rounded" /> : <div className="w-12 h-12 bg-gray-200 rounded" /> },
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

      <div className="mb-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Search products..." value={search} onChange={handleSearch} className="pl-10" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <LoadingSkeleton type="table" rows={5} />
        ) : (
          <DataTable columns={columns} data={products} onEdit={(row) => window.location.href = `/admin/products/edit/${row._id}`} onDelete={(row) => setDeleteId(row._id)} />
        )}
      </div>

      <ConfirmDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Product" description="Are you sure you want to delete this product? This action cannot be undone." />
    </div>
  )
}