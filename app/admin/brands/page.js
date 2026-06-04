'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getBrands, deleteBrand } from '@/services/api'
import Modal from '@/components/ui/Modal'
import BrandForm from '@/components/admin/BrandForm'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import LoadingSkeleton from '@/components/shared/LoadingSkeleton'
import { Button } from '@/components/ui/Button'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

export default function BrandsPage() {
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
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
      setBrands(response.data.brands)
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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary">Brands</h1>
        <Button onClick={() => { setEditBrand(null); setModalOpen(true) }}><Plus className="w-4 h-4 mr-2" /> Add Brand</Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <LoadingSkeleton type="table" rows={5} />
        ) : brands.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No brands yet. Add your first brand!</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Logo</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand) => (
                <tr key={brand._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    {brand.logo?.url ? (
                      <Image src={brand.logo.url} alt={brand.name} width={50} height={50} className="w-12 h-12 object-cover rounded" />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">{brand.name.charAt(0)}</div>
                    )}
                  </td>
                  <td className="py-3 px-4 font-medium">{brand.name}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${brand.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {brand.status ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => { setEditBrand(brand); setModalOpen(true) }} className="p-2 text-blue-500 hover:bg-blue-50 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => setDeleteId(brand._id)} className="p-2 text-red-500 hover:bg-red-50 rounded">
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