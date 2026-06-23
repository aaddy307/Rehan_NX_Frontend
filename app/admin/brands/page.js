'use client'

import { useEffect, useState } from 'react'
import { getBrands, deleteBrand } from '@/services/api'
import Modal from '@/components/ui/Modal'
import BrandForm from '@/components/admin/BrandForm'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import LoadingSkeleton from '@/components/shared/LoadingSkeleton'
import { Button } from '@/components/ui/Button'
import { Plus, Edit, Trash2, Search } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { toast } from 'sonner'

export default function BrandsPage() {
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editBrand, setEditBrand] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  useEffect(() => {
    fetchBrands()
  }, [])

  const fetchBrands = async () => {
    try {
      setLoading(true)
      const response = await getBrands()
      setBrands(response.data.brands || [])
    } catch (error) {
      toast.error('Failed to load brands')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteBrand(deleteId)
      toast.success('Brand deleted')
      setBrands(brands.filter((b) => b._id !== deleteId))
    } catch (error) {
      toast.error('Failed to delete')
    }
    setDeleteId(null)
  }

  const handleSuccess = () => {
    setModalOpen(false)
    setEditBrand(null)
    fetchBrands()
  }

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-primary">Brands</h1>
        <Button onClick={() => { setEditBrand(null); setModalOpen(true) }}>
          <Plus className="w-4 h-4 mr-2" /> Add Brand
        </Button>
      </div>

      {/* Search Box */}
      <div className="mb-6 max-w-md bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search brands by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <LoadingSkeleton type="table" rows={5} />
        ) : filteredBrands.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {search ? 'No matching brands found.' : 'No brands yet. Add your first brand!'}
          </div>
        ) : (
          <table className="w-full table-fixed">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-3 sm:px-4 font-medium text-gray-600 w-1/2">Name</th>
                <th className="text-left py-3 px-3 sm:px-4 font-medium text-gray-600 w-1/4">Status</th>
                <th className="text-right py-3 px-3 sm:px-4 font-medium text-gray-600 w-1/4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBrands.map((brand) => (
                <tr key={brand._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-3 sm:px-4 font-medium truncate">{brand.name}</td>
                  <td className="py-3 px-3 sm:px-4">
                    <span className={`px-2 py-1 rounded text-xs ${brand.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {brand.status ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-3 px-3 sm:px-4">
                    <div className="flex justify-end gap-1 sm:gap-2">
                      <button onClick={() => { setEditBrand(brand); setModalOpen(true) }} className="p-1.5 sm:p-2 text-blue-500 hover:bg-blue-50 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => setDeleteId(brand._id)} className="p-1.5 sm:p-2 text-red-500 hover:bg-red-50 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal open={modalOpen} onClose={() => { setModalOpen(false); setEditBrand(null) }} title={editBrand ? 'Edit Brand' : 'Add Brand'}>
        <BrandForm brand={editBrand} onSuccess={handleSuccess} />
      </Modal>

      <ConfirmDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Brand" description="Are you sure you want to delete this brand?" />
    </div>
  )
}