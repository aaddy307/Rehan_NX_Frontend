'use client'

import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { getInquiries, deleteInquiry } from '@/services/api'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import LoadingSkeleton from '@/components/shared/LoadingSkeleton'
import { Trash2, Phone, User, MessageSquare } from 'lucide-react'
import { toast } from 'sonner'
import { format } from '@/lib/utils'

export default function InquiriesPage() {
  const { isAuthenticated } = useAuthStore()
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) return

    const fetchInquiries = async () => {
      try {
        setLoading(true)
        const response = await getInquiries()
        setInquiries(response.data.inquiries)
      } catch (error) {
        console.error('Failed to load inquiries:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchInquiries()
  }, [isAuthenticated])

  const handleDelete = async () => {
    try {
      await deleteInquiry(inquiries._id)
      toast.success('Inquiry deleted')
      setInquiries(inquiries.filter((i) => i._id !== deleteId))
    } catch (error) {
      toast.error('Failed to delete')
    }
    setDeleteId(null)
  }

  const [deleteId, setDeleteId] = useState(null)

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">Inquiries</h1>

      <div className="space-y-4">
        {loading ? (
          <LoadingSkeleton type="table" rows={5} />
        ) : inquiries.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center text-gray-500">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No inquiries yet</p>
          </div>
        ) : (
          inquiries.map((inquiry) => (
            <div key={inquiry._id} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <h3 className="font-semibold text-primary">{inquiry.name}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <a href={`tel:${inquiry.phone}`} className="text-gray-600 hover:text-accent">{inquiry.phone}</a>
                  </div>
                  {inquiry.city && <p className="text-sm text-gray-500">City: {inquiry.city}</p>}
                  {inquiry.product && <p className="text-sm text-gray-500">Product: {inquiry.product}</p>}
                  <p className="text-gray-700 mt-2">{inquiry.message}</p>
                  <p className="text-xs text-gray-400 mt-2">{inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleString() : ''}</p>
                </div>
                <button onClick={() => setDeleteId(inquiry._id)} className="p-2 text-red-500 hover:bg-red-50 rounded self-start">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <ConfirmDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Inquiry" description="Are you sure you want to delete this inquiry?" />
    </div>
  )
}