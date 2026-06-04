'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getBanners, deleteBanner } from '@/services/api'
import Modal from '@/components/ui/Modal'
import BannerForm from '@/components/admin/BannerForm'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import LoadingSkeleton from '@/components/shared/LoadingSkeleton'
import { Button } from '@/components/ui/Button'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

export default function BannersPage() {
  const [banners, setBanners] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editBanner, setEditBanner] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  useEffect(() => {
    fetchBanners()
  }, [])

  const fetchBanners = async () => {
    try {
      setLoading(true)
      const response = await getBanners()
      setBanners(response.data.banners)
    } catch (error) {
      toast.error('Failed to load banners')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteBanner(deleteId)
      toast.success('Banner deleted')
      setBanners(banners.filter((b) => b._id !== deleteId))
    } catch (error) {
      toast.error('Failed to delete')
    }
    setDeleteId(null)
  }

  const handleSuccess = () => {
    setModalOpen(false)
    setEditBanner(null)
    fetchBanners()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary">Banners</h1>
        <Button onClick={() => { setEditBanner(null); setModalOpen(true) }}><Plus className="w-4 h-4 mr-2" /> Add Banner</Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <LoadingSkeleton type="table" rows={5} />
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Image</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Title</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {banners.map((banner) => (
                <tr key={banner._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    {banner.image?.url ? <Image src={banner.image.url} alt={banner.title} width={100} height={60} className="w-24 h-16 object-cover rounded" /> : <div className="w-24 h-16 bg-gray-200 rounded" />}
                  </td>
                  <td className="py-3 px-4 font-medium">{banner.title}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${banner.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{banner.status ? 'Active' : 'Inactive'}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => { setEditBanner(banner); setModalOpen(true) }} className="p-2 text-blue-500 hover:bg-blue-50 rounded"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => setDeleteId(banner._id)} className="p-2 text-red-500 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal open={modalOpen} onClose={() => { setModalOpen(false); setEditBanner(null) }} title={editBanner ? 'Edit Banner' : 'Add Banner'}>
        <BannerForm banner={editBanner} onSuccess={handleSuccess} />
      </Modal>

      <ConfirmDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Banner" description="Are you sure you want to delete this banner?" />
    </div>
  )
}