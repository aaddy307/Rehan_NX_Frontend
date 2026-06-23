'use client'

import { useEffect, useState } from 'react'
import { getCategories, deleteCategory } from '@/services/api'
import Modal from '@/components/ui/Modal'
import CategoryForm from '@/components/admin/CategoryForm'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import LoadingSkeleton from '@/components/shared/LoadingSkeleton'
import { Button } from '@/components/ui/Button'
import { Plus, Edit, Trash2, Search } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { toast } from 'sonner'

export default function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editCategory, setEditCategory] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const response = await getCategories({ all: true })
      setCategories(response.data.categories || [])
    } catch (error) {
      toast.error('Failed to load categories')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteCategory(deleteId)
      toast.success('Category deleted')
      setCategories(categories.filter((c) => c._id !== deleteId))
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete')
    }
    setDeleteId(null)
  }

  const handleSuccess = () => {
    setModalOpen(false)
    setEditCategory(null)
    fetchCategories()
  }

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-primary">Categories</h1>
        <Button onClick={() => { setEditCategory(null); setModalOpen(true) }}>
          <Plus className="w-4 h-4 mr-2" /> Add Category
        </Button>
      </div>

      {/* Search Box */}
      <div className="mb-6 max-w-md bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search categories by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <LoadingSkeleton type="table" rows={5} />
        ) : filteredCategories.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {search ? 'No matching categories found.' : 'No categories yet. Add your first category!'}
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
              {filteredCategories.map((cat) => (
                <tr key={cat._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-3 sm:px-4 font-medium truncate">{cat.name}</td>
                  <td className="py-3 px-3 sm:px-4">
                    <span className={`px-2 py-1 rounded text-xs ${cat.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{cat.status ? 'Active' : 'Inactive'}</span>
                  </td>
                  <td className="py-3 px-3 sm:px-4">
                    <div className="flex justify-end gap-1 sm:gap-2">
                      <button onClick={() => { setEditCategory(cat); setModalOpen(true) }} className="p-1.5 sm:p-2 text-blue-500 hover:bg-blue-50 rounded"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => setDeleteId(cat._id)} className="p-1.5 sm:p-2 text-red-500 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal open={modalOpen} onClose={() => { setModalOpen(false); setEditCategory(null) }} title={editCategory ? 'Edit Category' : 'Add Category'}>
        <CategoryForm category={editCategory} onSuccess={handleSuccess} />
      </Modal>

      <ConfirmDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Category" description="Are you sure you want to delete this category?" />
    </div>
  )
}